<?php require_once('../../Connections/sporteqa_nologin.php'); ?>
<?php //require_once('../../admin/functions_php.php'); ?>
<?php 
if (!isset($_SESSION)) {
  session_start();
} ?>
<?php
/*
UploadiFive
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
*/

/*
IMPORTANT: This script requires the PHP GD library
*/
if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysqli_real_escape_string") ? mysqli_real_escape_string($sporteqa, $theValue) : ((isset($sporteqa) && is_object($sporteqa)) ? mysqli_real_escape_string($sporteqa, $theValue) : ((trigger_error($sporteqa, E_USER_ERROR)) ? "" : ""));

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}
// Set the uplaod directory
$uploadDir = '/userfiles/media/';


if (!empty($_FILES)) {

	$fileData = $_FILES['Filedata'];

	if ($fileData) {
		$tempFile   = $fileData['tmp_name'];
		$uploadDir  = $_SERVER['DOCUMENT_ROOT'] . $uploadDir;
		$targetFile = $uploadDir . $fileData['name'];
		

		// Validate the file type
		$fileTypes = array('mp3', 'mp4', 'amr', 'mpg', 'swf', 'f4v', 'flv', 'wmv'); // Allowed file extensions
		$fileParts = pathinfo($fileData['name']);

		// Validate the filetype
		if (in_array(strtolower($fileParts['extension']), $fileTypes) && filesize($tempFile) > 0) {
			
			
			switch ($fileParts['extension']) {
				case "swf": case "f4v" : case "flv" : case "mp4"; case 'wmv':
					$linktype = 1;
					break;
				case "mp3": case "mp4": case "mpg":
					$linktype = 2;
					break;
				default:
					$linktype = 2;
			}
	
		$insertSQL = sprintf("INSERT INTO xs_audiovideo (title_".$_SESSION['admin_lang'].", desc_".$_SESSION['admin_lang'].", link, linktype, createdate, createby, active) VALUES (%s,%s,%s,%s,%s,%s,%s)",
					GetSQLValueString($_REQUEST['title'], "text"),
					GetSQLValueString($_REQUEST['desc'], "text"),
					GetSQLValueString("../userfiles/media/".$_FILES['Filedata']['name'], "text"),
					GetSQLValueString($linktype, "int"),
					GetSQLValueString(time(), "int"),
					GetSQLValueString($_SESSION['admin_fullname'], "text"),
					GetSQLValueString(1, "int")); 
		mysqli_select_db( $sporteqa, $database_sporteqa);
		$Result1 = mysqli_query( $sporteqa, $insertSQL) or die(mysqli_error($sporteqa));
			
			//audit_trail('Tambah audio/video '.$_REQUEST['title'],$_SESSION['admin_fullname'],'ADMIN','MANAGE_AUDIO_VIDEO: ADD_AUDIO/VIDEO');
			
			// Save the file
			move_uploaded_file($tempFile, $targetFile);
			echo '1';
			
		} else {

			// The file type wasn't allowed
			echo 'Invalid file type.';
		}
	}
}
?>