<?php //if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start(); ?>
<?php include_once(__DIR__."/../../../Connections/exsite_admin_unrestricted.php");?>
<?php
?><?php
header('Content-type: application/javascript');
ob_start();
include('login.js');
?>