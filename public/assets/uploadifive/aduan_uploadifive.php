<?php require_once(__DIR__.'/../../Connections/exsite_login.php'); ?>
<?php
ini_set( 'display_errors', 1 );
ini_set( 'display_startup_errors', 1 );
error_reporting( E_ALL );

$debug=0;
require_once('../vendor/tecnickcom/tcpdf/tcpdf.php');
require_once('../vendor/setasign/fpdi/src/autoload.php');

use setasign\Fpdi\Tcpdf\Fpdi;
/*error_reporting(E_ALL);
ini_set('display_errors', 1);*/
/*
UploadiFive
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
*/

/*
IMPORTANT: This script requires the PHP GD library
*/
//print_r($_SESSION);exit;
// Set the uplaod directory
$uploadDir = __DIR__ . '/../../../userfiles/user/' . $_SESSION[ 'user_id' ] . '/file/';

// Check if the directory exists
if ( !is_dir( $uploadDir ) ) {
    // Try to create the directory, with recursive option (for nested folders) and proper permissions
    if ( mkdir( $uploadDir, 0755, true ) ) {
        if($debug) echo "<hr>Directory created successfully.";
    } else {
        if($debug) echo "<hr>Failed to create the directory.";
    }
} else {
    if($debug) echo "<hr>Directory already exists.";
}


function errorHandler( $errno, $errstr, $errfile, $errline ) {
    // In this script, the silently suppress any error generated by getimagesize
    // which will throw an error if the "image" isn't an image
    // ie doesn't have a valid width / height

    /* Don't execute PHP internal error handler */
    return true;
}

$old_error_handler = set_error_handler( "errorHandler" );

// Check if the file has a width and height
function isImage( $tempFile ) {

    // Get the size of the image
    $size = getimagesize( $tempFile );

    if ( isset( $size ) && $size[ 0 ] && $size[ 1 ] && $size[ 0 ] * $size[ 1 ] > 0 ) {
        return true;
    } else {
        return false;
    }

}

function imageList( $tempFile ) {
    $size = array_values( getimagesize( $tempFile ) );
    return list( $width, $height, $type, $attr ) = $size;
}

function imageType( $type ) {
    return image_type_to_mime_type( $type );
}

function getPdfVersion( $filePath ) {
    // Open the PDF file in binary mode
    $file = fopen( $filePath, 'rb' );
    if ( !$file ) {
        return false;
    }

    // Read the first 8 bytes to capture the PDF version
    $header = fread( $file, 8 );
    fclose( $file );

    // Check if it's a PDF file and extract the version
    if ( preg_match( '/%PDF-(\d\.\d)/', $header, $matches ) ) {
        return $matches[ 1 ]; // Return the PDF version (e.g., 1.4, 1.7)
    }

    return false; // Return false if the file is not a valid PDF
}

if ( !empty( $_FILES ) ) {

    $fileData = $_FILES[ 'Filedata' ];

    if ( $fileData ) {
        $tempFile = $fileData[ 'tmp_name' ];
        $aduan_files_shortname = shorten($fileData['name']);
        $targetFile = $uploadDir . $aduan_files_shortname;

        // check if folder exists. if not, create


        // Validate the file type
        $fileTypes = array( 'png', 'jpg', 'gif', 'jpeg', 'webp', 'pdf' ); // Allowed file extensions
        $fileParts = pathinfo( $fileData[ 'name' ] );

        // Validate the filetype
        if ( in_array( strtolower( $fileParts[ 'extension' ] ), $fileTypes ) && filesize( $tempFile ) > 0 ) {

			$aduan_files_user_id = $_POST['user_id'];
			$aduan_files_hartanah_id = $_POST['hartanah_id'];
			$file_modby = $_PSOT[ 'aduan_user_nama' ];
			
			

            if ( isset( $_POST[ 'timestamp' ] ) && ( $_POST[ 'timestamp' ] != "" ) ) {
                $file_timestamp = $_POST[ 'timestamp' ];
            } else {
                $file_timestamp = time();
            }

			
			
            // Save the file
            move_uploaded_file( $tempFile, $targetFile );

            $filesize = filesize( $targetFile ); //echo $filesize;exit;	
             $pdf_version = getPdfVersion($targetFile ) ;

            $filename = $fileData[ 'name' ];
            $ext = pathinfo( $filename, PATHINFO_EXTENSION );
            if ( strtolower( $ext ) == "pdf" ) {

                if ( $pdf_version !== false ) {
                    if ($debug) echo "<hr>The PDF version is: " . $pdf_version;
                } else {
                    if ($debug) echo "<hr>This is not a valid PDF file.";
                }
                //exit;


                // parse only if file size < 10MB
                if ( $filesize < 10485760 ) {
                    include( '../pdfparser/vendor/autoload.php' );

                    
                    // Parse pdf file and build necessary objects.
                    $parser = new \Smalot\PdfParser\Parser();

                    try {
                        $pdf = $parser->parseFile( $targetFile );

                        // Retrieve all pages from the pdf file.
                        $pages = $pdf->getPages();

                        // Loop over each page to extract text.
                        foreach ( $pages as $page ) {
                            $text .= $page->getText();
                        }
                        //echo $text;

                        // Retrieve all details from the pdf file.
                        $details = $pdf->getDetails();

                        // Loop over each property to extract values (string or array).
                        foreach ( $details as $property => $value ) {
                            if ( is_array( $value ) ) {
                                $value = implode( ', ', $value );
                            }
                            $text_detail .= $property . ' => ' . $value . "\n";
                        }
                        //echo $text_detail;
                        //$text = $pdf->getText();

                        //$text = Encoding::fixUTF8($text);

                        $filter1 = filter_var( $text, FILTER_SANITIZE_STRING );
                        $filter2 = preg_replace( '/[\x00-\x1F\x7F\xA0]/u', " ", $filter1 );
                        $file_ocr_keyword = preg_replace( '/\s+/', ' ', $filter2 );
                        
                        /*function extractFirstPageAsImage($pdfFile, $outputImage) {
                            $pdf = new Fpdi();
                            $pdf->setSourceFile($pdfFile);
                            $templateId = $pdf->importPage(1);
                            $pdf->AddPage();
                            $pdf->useTemplate($templateId);

                            // Output as PDF to a string
                            $pdfContent = $pdf->Output('', 'S');

                            // Convert the outputted page to an image using GD (or any other image library)
                            $image = imagecreatefromstring($pdfContent);

                            if ($image === false) {
                                throw new Exception("Failed to create image from PDF content.");
                            }

                            // Save the image to a file
                            imagejpeg($image, $outputImage);

                            // Free up memory
                            imagedestroy($image);

                            return $outputImage;
                        }

                        try {
                            $pdfFile = $targetFile;
                            $outputImage = 'output_image.jpg';
                            extractFirstPageAsImage($pdfFile, $outputImage);
                            echo "Cover image extracted to: $outputImage";
                        } catch (Exception $e) {
                            echo "Error: " . $e->getMessage();
                        }*/


                    } catch ( Exception $e ) {
                        if ( $e->getMessage() ) {
                            //echo 'Returned: '.$e->getMessage();
                            $file_ocr_keyword = "";
                        }
                    }

                }
            } else {
                $file_ocr_keyword = "";
            }

            
			$fileExtension = strtolower(pathinfo($fileData['name'], PATHINFO_EXTENSION));

			// Define the allowed image types
			$imageTypes = array('png', 'jpg', 'jpeg', 'gif', 'webp');

			// Check if the file is an image or a PDF
			if (in_array($fileExtension, $imageTypes)) {
				$aduan_file_type = 1; // Image
			} elseif ($fileExtension === 'pdf') {
				$aduan_file_type = 2; // PDF
			} else {
				$aduan_file_type = 0; // Unknown or unsupported file type
			}

			// Assume these are the values retrieved from the form or file upload process
			$aduan_filename = $fileData['name'];
			$aduan_files_moddate = $_POST['timestamp'];  // Current timestamp
			$aduan_files_modby = $_POST['aduan_user_nama'];  // Person modifying the record
			$aduan_files_full_path =  $coverImagePath;  // Full file path
			$aduan_files_user_id = $_POST['user_id'];
			$aduan_files_hartanah_id = $_POST['hartanah_id'];
			$aduan_files_subject_id= $_POST['subject_id'];
			$aduan_files_aduan_id= $_POST['id_rekod'];
			$aduan_files_ocr_keyword= $file_ocr_keyword;
			$aduan_files_pdf_file= $targetFile;
			

			// Prepare the SQL statement to call the stored procedure
			$sql = "CALL insert_into_aduan_files(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

			// Prepare the statement
			mysqli_select_db( $exsite, $database_exsite );
			$stmt = mysqli_prepare($exsite, $sql);

			// Bind the parameters in the correct order
			mysqli_stmt_bind_param($stmt, 'sissssiiisss', 
				$aduan_filename,          // aduan_filename
				$aduan_files_aduan_id,     // aduan_files_moddate
				$aduan_file_type,         // aduan_file_type
				$aduan_files_moddate,     // aduan_files_moddate
				$aduan_files_modby,       // aduan_files_modby
				$aduan_files_full_path,   // aduan_files_full_path
				$aduan_files_user_id,     // aduan_files_user_id
				$aduan_files_hartanah_id,  // aduan_files_hartanah_id
				$aduan_files_subject_id,  // aduan_files_hartanah_id
				$aduan_files_shortname,  // aduan_files_hartanah_id
				$aduan_files_ocr_keyword,  // aduan_files_ocr_keyword
				$aduan_files_pdf_file  // aduan_files_ocr_keyword
			);

			// Display the query for debugging purposes
			$formatted_query = sprintf(
				"CALL insert_into_aduan_files('%s', '%s', '%s', '%s', '%s', '%s', %d, %d, %d, %s, %s, %s)",
				$aduan_filename,          // aduan_filename
				$aduan_files_aduan_id,     // aduan_files_moddate
				$aduan_file_type,         // aduan_file_type
				$aduan_files_moddate,     // aduan_files_moddate
				$aduan_files_modby,       // aduan_files_modby
				$aduan_files_full_path,   // aduan_files_full_path
				$aduan_files_user_id,     // aduan_files_user_id
				$aduan_files_hartanah_id, // aduan_files_hartanah_id
				$aduan_files_subject_id,   // aduan_files_subject_id
				$aduan_files_shortname,  // aduan_files_subject_id
                $aduan_files_ocr_keyword,  // aduan_files_ocr_keyword
                $aduan_files_pdf_file  // aduan_files_ocr_keyword
			);
			if ($debug) echo "<hr>Query: " . $formatted_query;

			// Execute the statement
			if (mysqli_stmt_execute($stmt)) {
				// Use mysqli_affected_rows to check how many rows were inserted
				$affected_rows = mysqli_affected_rows($exsite);
				if ($debug) echo "<hr>File data inserted successfully. Rows affected: $affected_rows";
			} else {
				// Output the error message
				if ($debug) echo "<hr>Error inserting file data: " . mysqli_error($exsite);
			}


			// Close the statement
			mysqli_stmt_close($stmt);
			
        } else {

            // The file type wasn't allowed
            if($debug) echo "<hr>Invalid file type.";
        }
    }
}
?>