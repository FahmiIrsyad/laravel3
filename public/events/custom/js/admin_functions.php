<?php require_once('../../../Connections/sporteqa_nologin.php'); ?>
<?php //if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler"); else ob_start(); ?>
<?php
$basedir = dirname( __FILE__ ); 
header("content-type: application/x-javascript");
include($basedir.'/../../functions_php.php');
include($basedir."/admin_functions.js");
?>