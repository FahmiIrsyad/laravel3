<?php
require '../vendor/autoload.php'; // Include necessary libraries
require '../Connections/exsite.php';

use Smalot\PdfParser\Parser;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$debug = 0;

// Set the upload directory
$uploadDir = __DIR__ . '/../../../userfiles/admin/' . $_SESSION['admin_user_id'] . '/file/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Helper function to get PDF version
function getPdfVersion($filePath) {
    $file = fopen($filePath, 'rb');
    if (!$file) return false;
    $header = fread($file, 8);
    fclose($file);
    return preg_match('/%PDF-(\d\.\d)/', $header, $matches) ? $matches[1] : false;
}

// Check if files are uploaded
if (!empty($_FILES)) {
    $fileData = $_FILES['Filedata'];
    if ($fileData) {
        $tempFile = $fileData['tmp_name'];
        $aduan_files_shortname = $fileData['name'];
        $targetFile = $uploadDir . $aduan_files_shortname;

        // Allowed file extensions
        $fileTypes = ['png', 'jpg', 'gif', 'jpeg', 'webp', 'pdf'];
        $fileParts = pathinfo($fileData['name']);

        // Validate file type and size
        if (in_array(strtolower($fileParts['extension']), $fileTypes) && filesize($tempFile) > 0) {
            move_uploaded_file($tempFile, $targetFile);

            $fileExtension = strtolower(pathinfo($fileData['name'], PATHINFO_EXTENSION));
            $aduan_file_type = in_array($fileExtension, ['png', 'jpg', 'jpeg', 'gif', 'webp']) ? 1 : ($fileExtension === 'pdf' ? 2 : 0);

            // Parse PDF if applicable
            $file_ocr_keyword = '';
            if ($aduan_file_type === 2) {
                $pdf_version = getPdfVersion($targetFile);
                if ($pdf_version) {
                    $parser = new Parser();
                    try {
                        $pdf = $parser->parseFile($targetFile);
                        $text = '';
                        foreach ($pdf->getPages() as $page) {
                            $text .= $page->getText();
                        }
                        $file_ocr_keyword = preg_replace('/\s+/', ' ', preg_replace('/[\x00-\x1F\x7F\xA0]/u', ' ', filter_var($text, FILTER_SANITIZE_STRING)));
                    } catch (Exception $e) {
                        $file_ocr_keyword = '';
                    }
                }
            }

            // Insert into the aduan_files table
            $query = "INSERT INTO aduan_files (
                aduan_filename, aduan_rekod_id, aduan_file_type, aduan_files_moddate, aduan_files_modby, aduan_files_full_path, aduan_files_user_id, aduan_files_shortname, aduan_files_ocr_keyword, aduan_files_pdf_path
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $exsite->prepare($query);
            if ($stmt) {
                $aduan_rekod_id = $_POST['id_rekod'];
                $current_time = time();
                $aduan_files_modby = $_SESSION['admin_user_fullname'];
                $aduan_files_user_id = $_SESSION['admin_user_id'];
                $aduan_files_pdf_path = $aduan_file_type === 2 ? $targetFile : null;

                $stmt->bind_param(
                    'siississss',
                    $aduan_files_shortname,
                    $aduan_rekod_id,
                    $aduan_file_type,
                    $current_time,
                    $aduan_files_modby,
                    $targetFile,
                    $aduan_files_user_id,
                    $aduan_files_shortname,
                    $file_ocr_keyword,
                    $aduan_files_pdf_path
                );

                if ($stmt->execute()) {
                    if ($debug) echo "File uploaded and database updated successfully.";
                } else {
                    if ($debug) echo "Error updating database: " . $stmt->error;
                }
                $stmt->close();
            } else {
                if ($debug) echo "Error preparing database statement.";
            }
        } else {
            if ($debug) echo "Invalid file type or empty file.";
        }
    }
}
?>
