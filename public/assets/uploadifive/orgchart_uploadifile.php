<?php require_once('../Connections/exsite_nologin.php'); ?>
<?php
if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysqli_real_escape_string") ? mysqli_real_escape_string($exsite, $theValue) : ((isset($exsite) && is_object($exsite)) ? mysqli_real_escape_string($exsite, $theValue) : ((trigger_error($exsite, E_USER_ERROR)) ? "" : ""));

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

?>
<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

// Define a destination
$targetFolder = '/userfiles/image/';
$file_modby = $_REQUEST['modby'];
$file_moddate = $_REQUEST['moddate'];
$verifyToken = md5('unique_salt' . $_POST['timestamp']);
$id = $_REQUEST['id_page'];

if (!empty($_FILES) && $_POST['token'] == $verifyToken) {

	
	// Validate the file type
	$fileTypes = array('jpg', 'jpeg', 'gif', 'png','pdf','csv'); // Allowed file extensions
	$fileTypes_image = array('jpg', 'jpeg', 'gif', 'png'); // Allowed file extensions
	$fileTypes_doc = array('pdf'); // Allowed file extensions
	$fileParts = pathinfo(strtolower($_FILES['Filedata']['name']));
	
	if (in_array($fileParts['extension'],$fileTypes)) {
		
		$targetFolder = '/userfiles/image/';

		$tempFile = $_FILES['Filedata']['tmp_name'];
		$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder . '/';
		$targetFile = rtrim($targetPath,'/') . '/' . $_FILES['Filedata']['name'];

        if (in_array($fileParts['extension'],$fileTypes_image)) {
        echo move_uploaded_file ($tempFile, $targetFile);
		
		// delete file first
		mysqli_select_db( $exsite, $database_exsite);
		$query_list_org_chart = "SELECT * FROM xs_file WHERE file_type = 3";
		$list_org_chart = mysqli_query( $exsite, $query_list_org_chart) or die(mysqli_error($exsite));
		$row_list_org_chart = mysqli_fetch_assoc($list_org_chart);
		$totalRows_list_org_chart = mysqli_num_rows($list_org_chart);
		
		if ($totalRows_list_org_chart>0){
			do {
				unlink('/userfiles/image/'.$row_list_org_chart['xs_file']);
			} while ($row_list_org_chart = mysqli_fetch_assoc($list_org_chart));
			
			// delete all associated orgchart images
			$deleteSQL = "DELETE FROM xs_file WHERE file_type = 3";
			mysqli_select_db( $exsite, $database_exsite);
			$Result1 = mysqli_query( $exsite, $deleteSQL) or die(mysqli_error($exsite));
		}
        
		$insertSQL = sprintf("INSERT INTO xs_file (file_name, id_page, file_type, file_date, file_modby) VALUES (%s, %s, %s, %s, %s)",
				   GetSQLValueString($_FILES['Filedata']['name'], "text"),
				   GetSQLValueString($_REQUEST['page_id'], "int"),
					GetSQLValueString($_REQUEST['filetype'], "int"),
					GetSQLValueString(time(), "int"),
					GetSQLValueString($_REQUEST['modby'], "text"));
		mysqli_select_db( $exsite, $database_exsite);
		$Result1 = mysqli_query( $exsite, $insertSQL) or die(mysqli_error($exsite));
		move_uploaded_file(($tempFile), $targetFile);
			 //echo $insertSQL."<br>";
			 //echo $tempFile."<br>";
			// echo $targetFile."<br>";
		echo '1';
		} 
		
		
	} else {
		echo 'Invalid file type.';
	}
} else {
	echo "the file was unable to be uploaded";
}
?>