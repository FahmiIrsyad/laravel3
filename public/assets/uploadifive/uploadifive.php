<?php
/*
UploadiFive
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
*/

// Set the uplaod directory
$uploadDir = '/uploads/';

// Set the allowed file extensions
$fileTypes = array('jpg', 'jpeg', 'gif', 'png','pdf','csv'); // Allowed file extensions

$verifyToken = md5('unique_salt' . $_POST['timestamp']);

if (!empty($_FILES) && $_POST['token'] == $verifyToken) {
	$tempFile   = $_FILES['Filedata']['tmp_name'];
	$uploadDir  = $_SERVER['DOCUMENT_ROOT'] . $uploadDir;
	$targetFile = $uploadDir . $_FILES['Filedata']['name'];

	// Validate the filetype
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	if (in_array(strtolower($fileParts['extension']), $fileTypes)) {

		  $insertSQL = sprintf("INSERT INTO aduan_files (aduan_filename, aduan_rekod_id) VALUES (%s, %s)",
                       GetSQLValueString(md5($tempFile), "text"),
					   GetSQLValueString($_REQUEST['aduan_rekod_id'], "int"));

	
			
		mysqli_select_db( $exsite, $database_exsite);
		$Result1 = mysqli_query( $exsite, $insertSQL) or die(mysqli_error($exsite));
		
		// Save the file
		move_uploaded_file(md5($tempFile), $targetFile);
		echo 1;

	} else {

		// The file type wasn't allowed
		echo 'Invalid file type.';

	}
}
?>