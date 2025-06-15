<?php
echo 4;
$mail->AddBCC("nikfariz@gmail.com", "Nik Adlin Fariz");
//$mail->AddAddress("ude@mlk.moh.gov.my","Ude Rahman");                  // name is optional
//$mail->AddReplyTo($from, $fromname);

//$mail->WordWrap = 50;  
if (isset($attachment) && ($attachment!="")){
	$mail->AddAttachment($attachment);  
}// set word wrap to 50 characters
       // add attachments
//$mail->AddAttachment("/tmp/image.jpg", "new.jpg");    // optional name
$mail->IsHTML(true);                                  // set email format to HTML
$mail->SMTPDebug = 1;
$mail->Subject = $subject;
$mail->Body    = $mess;

//$mail->AltBody = "This is the body in plain text for non-HTML mail clients";

if(!$mail->Send()){
   echo "Message could not be sent. <p>";
   echo "Mailer Error: " . $mail->ErrorInfo;
   exit;
} else {
	echo "Email sent";
}?>