<?php require_once(__DIR__.'/../../../Connections/exsite_nologin.php'); ?>
<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
// Define a destination
$targetFolder = '../../../userfiles/1/image/';
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
				$targetFolder = '../../../userfiles/1/image/';
				$tempFile = $_FILES['Filedata']['tmp_name'];
				$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder.'/';
				$targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
                
                imagedestroy($this->dst_r);
                unlink($targetFile);
                //imagedestroy($this->img_r);
                
            }
            
        }
		}
        $targetFolder = '../../../userfiles/1/image/';
		$tempFile = $_FILES['Filedata']['tmp_name'];
		$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder . '/';
		$targetFile = rtrim($targetPath,'/') . '/' . $_FILES['Filedata']['name'];
        if (in_array($fileParts['extension'],$fileTypes_image)) {
        move_uploaded_file ($tempFile, $targetFile);
            echo "targetfile->".$targetFile;
        
		$insertSQL = sprintf("INSERT INTO xs_file (file_name, id_page, file_type, file_date, file_modby) VALUES (%s, %s, %s, %s, %s)",
				   GetSQLValueString($_FILES['Filedata']['name'], "text"),
				   GetSQLValueString($_REQUEST['page_id'], "int"),
					GetSQLValueString($_REQUEST['filetype'], "int"),
					GetSQLValueString(time(), "int"),
					GetSQLValueString($_REQUEST['modby'], "text"));
            echo $insertSQL;
		mysqli_select_db( $exsite, $database_exsite);
		$Result1 = mysqli_query( $exsite, $insertSQL) or die(mysqli_error($exsite));
	
			
		} 
		echo '1';
		
	} else {
		echo 'Invalid file type.';
	}
} else {
	echo "the file was unable to be uploaded";
}
?>