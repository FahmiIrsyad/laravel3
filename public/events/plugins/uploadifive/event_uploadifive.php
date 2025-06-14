<?php $basedir = dirname( __FILE__ );
require_once($basedir.'/../../../Connections/sporteqa.php');?>
<?php

ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
// Set the uplaod directory
$targetFolder = '/userfiles/user/'.$_POST['spq_event_id'].'/reg';

function errorHandler($errno, $errstr, $errfile, $errline) {
	// In this script, the silently suppress any error generated by getimagesize
	// which will throw an error if the "image" isn't an image
	// ie doesn't have a valid width / height

    /* Don't execute PHP internal error handler */
    return true;
}

$old_error_handler = set_error_handler("errorHandler");

// Check if the file has a width and height
function isImage($tempFile) {

	// Get the size of the image
    $size = getimagesize($tempFile);

	if (isset($size) && $size[0] && $size[1] && $size[0] *  $size[1] > 0) {
		return true;
	} else {
		return false;
	}

}
function imageList($tempFile){
	$size = array_values(getimagesize($tempFile));
	return list($width, $height, $type, $attr) = $size;
}
function imageType($type){
	return image_type_to_mime_type($type);
}
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
				//echo $this->output;
            }
            
            function setUploadDir($dirname) {
                $this->uploaddir = $dirname;
            }
            
            function flush($spq_event_id) {
				$targetFolder = '/userfiles/user/'.$spq_event_id.'/reg';

				$tempFile = $_FILES['Filedata']['tmp_name'];
				$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder.'/';
				$targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
				$ext = strtoupper(pathinfo($targetFile, PATHINFO_EXTENSION));
				$fileEnc = md5($tempFile).".".strtolower($ext);
				$targetFileEnc =  str_replace('//','/',$targetPath) . $fileEnc;
                
                imagedestroy($this->dst_r);
                unlink($targetFileEnc);
                //imagedestroy($this->img_r);
                
            }
            
        }

if (!empty($_FILES)) {

	$fileData = $_FILES['Filedata'];

	if ($fileData) {
		$tempFile   = $fileData['tmp_name'];
		$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder . '/';
		$targetFile = rtrim($targetPath,'/') . '/' . $_FILES['Filedata']['name'];
		
		

		// Validate the file type
		$fileTypes = array('png', 'jpg', 'gif','jpeg'); // Allowed file extensions
		$fileParts = pathinfo($fileData['name']);

		// Validate the filetype
		if (in_array(strtolower($fileParts['extension']), $fileTypes) && filesize($tempFile) > 0 && isImage($tempFile)) {
		
	

			$id = $_REQUEST['spq_file_id'];
			$file_modby = $_REQUEST['modby'];
			$file_moddate = $_REQUEST['moddate'];
			
			$targetFolder = '/userfiles/user/'.$_POST['spq_event_id'].'/reg';

			$tempFile = $_FILES['Filedata']['tmp_name'];
			$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder.'/';
			$targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
			$ext = strtoupper(pathinfo($targetFile, PATHINFO_EXTENSION));
			$fileEnc = md5($tempFile).".".strtolower($ext);
			$targetFileEnc =  str_replace('//','/',$targetPath) . $fileEnc;
			
			move_uploaded_file($tempFile, $targetFile);	
			$imgcompress = $_REQUEST['imgcompress'];

			
			// insert xs_file with relevant document info
			$updateSQL = sprintf("INSERT INTO xs_file (spq_file_id, file_name, file_type, file_date, file_modby, spq_event_id, spq_event_registration_id, spq_event_user_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
				    GetSQLValueString($id, "int"),
					GetSQLValueString($_FILES['Filedata']['name'], "text"),
				    GetSQLValueString(2, "int"),
					GetSQLValueString($file_moddate, "int"),
					GetSQLValueString($file_modby , "text"),
					GetSQLValueString($_POST['spq_event_id'], "text"),
					GetSQLValueString($_POST['timestamp'], "text"),
					GetSQLValueString($_POST['spq_event_user_id'], "text"));
			mysqli_select_db( $sporteqa, $database_sporteqa); 
			$Result1 = mysqli_query( $sporteqa, $updateSQL) or die(mysqli_error($sporteqa));
			
			
			
			
	    
	
		$image = new Image();
        $image->setFile($targetFileEnc);
        $image->setUploadDir($targetPath);
		
        $image->resize(1024);
        $image->createFile("l_".md5($tempFile));
		$image->resize(640);
        $image->createFile("m_".md5($tempFile));
        $image->resize(100);
        $image->createFile("s_".md5($tempFile));
		
		if ($imgcompress==1){ // delete original image
			$image->flush($_POST['spq_event_id']);
		}
			
			// Save the file
			//move_uploaded_file($tempFile, $targetFileEnc);
			
		} else {

			// The file type wasn't allowed
			echo 'Invalid file type.';
		}
	}
}
?>