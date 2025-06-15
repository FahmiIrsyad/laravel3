<?php require_once('../Connections/sporteqa_nologin.php'); ?>
<?php
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

?>
<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

// Define a destination
//$targetFolder = '/uploads'; // Relative to the root
//$targetFolder = '/userfiles/aduan.pkns';
$targetFolder = '/../userfiles/aduan.mais/';
$file_modby = $_REQUEST['modby'];
$file_moddate = $_REQUEST['moddate'];
$verifyToken = md5('unique_salt' . $_POST['timestamp']);
//echo $_POST['timestamp']." | ".$_POST['token']." | ".$verifyToken;

$id = $_REQUEST['id_page'];

if (!empty($_FILES) && $_POST['token'] == $verifyToken) {

	//echo "Processing";
	// Validate the file type
	$fileTypes = array('jpg', 'jpeg', 'gif', 'png','pdf','csv'); // Allowed file extensions
	$fileTypes_image = array('jpg', 'jpeg', 'gif', 'png'); // Allowed file extensions
	$fileTypes_doc = array('pdf');
	$fileParts = pathinfo(strtolower($_FILES['Filedata']['name']));
	
	if (in_array($fileParts['extension'],$fileTypes)) {
		//move_uploaded_file($tempFile,$targetFile);
		
		if (in_array($fileParts['extension'],$fileTypes_image)) {
        class Image {
            
            var $uploaddir;
            var $quality = 80;
            var $ext;
            var $dst_r;
            var $img_r;
            var $img_w;
            var $img_h;
            var $output;
            var $data;
            var $datathumb;
            
            function setFile($src = null) {
                $this->ext = strtoupper(pathinfo($src, PATHINFO_EXTENSION));
                if(is_file($src) && ($this->ext == "JPG" OR $this->ext == "JPEG")) {
                    $this->img_r = ImageCreateFromJPEG($src);
                } elseif(is_file($src) && $this->ext == "PNG") {
                    $this->img_r = ImageCreateFromPNG($src);      
                } elseif(is_file($src) && $this->ext == "GIF") {
                    $this->img_r = ImageCreateFromGIF($src);
                }
                $this->img_w = imagesx($this->img_r);
                $this->img_h = imagesy($this->img_r);
            }
            
            function resize($w = 100) {
                $h =  $this->img_h / ($this->img_w / $w);
                $this->dst_r = ImageCreateTrueColor($w, $h);
                imagecopyresampled($this->dst_r, $this->img_r, 0, 0, 0, 0, $w, $h, $this->img_w, $this->img_h);
                $this->img_r = $this->dst_r;
                $this->img_h = $h;
                $this->img_w = $w;
            }
            
            function createFile($output_filename = null) {
                if($this->ext == "JPG" OR $this->ext == "JPEG") {
                    imageJPEG($this->dst_r, $this->uploaddir.$output_filename.'.'.strtolower($this->ext), $this->quality);
                } elseif($this->ext == "PNG") {
                    imagePNG($this->dst_r, $this->uploaddir.$output_filename.'.'.strtolower($this->ext));
                } elseif($this->ext == "GIF") {
                    imageGIF($this->dst_r, $this->uploaddir.$output_filename.'.'.strtolower($this->ext));
                }
                $this->output = $this->uploaddir.$output_filename.'.'.strtolower($this->ext);
            }
            
            function setUploadDir($dirname) {
                $this->uploaddir = $dirname;
            }
            
            function flush() {
				$targetFolder = '/../userfiles/aduan.mais/';
				//$targetFolder = '/userfiles/aduan.pkns';
				$tempFile = $_FILES['Filedata']['tmp_name'];
				$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder.'/';
				$targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
                
                imagedestroy($this->dst_r);
                unlink($targetFile);
                //imagedestroy($this->img_r);
                
            }
            
        }
		}
        $targetFolder = '/../userfiles/aduan.mais/';
		$tempFile = $_FILES['Filedata']['tmp_name'];
		$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder . '/';
		$targetFile = rtrim($targetPath,'/') . '/' . $_FILES['Filedata']['name'];
		
        
        
        
		if (in_array($fileParts['extension'],$fileTypes_image)) {
		
		move_uploaded_file ($tempFile, $targetFile);
        $image = new Image();
        $image->setFile($targetFile);
        $image->setUploadDir($targetPath);
        $image->resize(640);
        $image->createFile(md5($tempFile));
		$image->resize(250);
        $image->createFile("p_".md5($tempFile));
        $image->resize(100);
        $image->createFile("s_".md5($tempFile));
		
		
		
		$ext = strtoupper(pathinfo($targetFile, PATHINFO_EXTENSION));
		
		$ori_file = md5($tempFile).".".strtolower($ext);
		$p_ori_file = "p_".md5($tempFile).".".strtolower($ext);
		$s_ori_file = "s_".md5($tempFile).".".strtolower($ext);
		
		$ori_targetFile = rtrim($targetPath,'/') . '/' . $ori_file;
		$p_targetFile = rtrim($targetPath,'/') . '/' . $p_ori_file;
		$s_targetFile = rtrim($targetPath,'/') . '/' . $s_ori_file;
		
		 	$insertSQL = sprintf("INSERT INTO aduan_files (aduan_filename, aduan_rekod_id, aduan_file_type, aduan_file_format, unique_id) VALUES (%s, %s, %s, %s, %s)",
                       GetSQLValueString(md5($tempFile).".".strtolower($ext), "text"),
					   GetSQLValueString($_REQUEST['aduan_rekod_id'], "int"),
					   GetSQLValueString($_REQUEST['aduan_file_type'], "int"),
					   GetSQLValueString(1, "int"),
					   GetSQLValueString($verifyToken, "text"));
		} else if (in_array($fileParts['extension'],$fileTypes_doc))  {
			$ext = strtoupper(pathinfo($targetFile, PATHINFO_EXTENSION));
			move_uploaded_file ($tempFile, $targetFile);
			$insertSQL = sprintf("INSERT INTO aduan_files (aduan_filename, aduan_rekod_id, aduan_file_type, aduan_file_format, unique_id) VALUES (%s, %s, %s, %s, %s)",
                       GetSQLValueString($_FILES['Filedata']['name'], "text"),
					   GetSQLValueString($_REQUEST['aduan_rekod_id'], "int"),
					   GetSQLValueString($_REQUEST['aduan_file_type'], "int"),
					   GetSQLValueString(2, "int"),
					   GetSQLValueString($verifyToken, "text"));
		}
		//echo $insertSQL;
		mysqli_select_db( $sporteqa, $database_sporteqa);
		$Result1 = mysqli_query( $sporteqa, $insertSQL) or die(mysqli_error($sporteqa));
		
		
		$image->flush();
    
		echo '1';
		
	} else {
		echo 'Invalid file type.';
	}
}
?>