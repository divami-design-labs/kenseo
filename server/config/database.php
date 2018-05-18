<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

global $AppGlobal;

$host = $_SERVER['HTTP_HOST'];

$AppGlobal['db'] = array();

$AppGlobal['db']['hostname'] = "localhost";
$AppGlobal['db']['username'] = "root";
$AppGlobal['db']['password'] = "";

if($host == "kenseodev.divami.com"){
    $AppGlobal['db']['database'] = "kenseodev";
}
else{
    $AppGlobal['db']['database'] = "kenseo";
}

$AppGlobal['db']['dbdriver'] = "mysql";
$AppGlobal['db']['pconnect'] = TRUE;
$AppGlobal['db']['db_debug'] = TRUE;
$AppGlobal['db']['cache_on'] = FALSE;
$AppGlobal['db']['cachedir'] = "";
$AppGlobal['db']['char_set'] = "utf8";
$AppGlobal['db']['dbcollat'] = "utf8_general_ci";


/* End of file database.php */
?>