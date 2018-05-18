<?php

global $AppGlobal;

$host = $_SERVER['HTTP_HOST'];

$AppGlobal['log']['mode']       = "ON" ;
$AppGlobal['log']['modules']    = "ALL" ;
$AppGlobal['cache']             = array();
$AppGlobal['cache']['type']     = "apc";
$AppGlobal['cache']['enable']   = "TRUE";
$AppGlobal['cache']['live']     = "0";
$AppGlobal['log']['path']       = "/var/tmp/kenseo.log";
$AppGlobal['global']['storeLocation'] = "media/";
$AppGlobal['googleauth']['App'] = array();
// Local settings
if($host == "localhost"){  
    $AppGlobal['log'] = array();

    // Local
    $AppGlobal['log']['path'] = "C:/xampp/htdocs/kenseo/error.log" ;
    $AppGlobal['global']['storeLocation'] = "D:/";	
    
    $AppGlobal['global']['domain'] = "http://localhost/kenseo/";
    
    // Google auth
    $AppGlobal['googleauth']['App']['clientId'] = "620805159491-maiv301gjres7gdbn7k0e8lgg1lnebm9.apps.googleusercontent.com";
    $AppGlobal['googleauth']['App']['clientSecret'] = "Gi4obPHtddRfZ9AjHtL_6ELu";
}
elseif($host == "kenseodev.divami.com"){
    $AppGlobal['global']['domain'] = "https://kenseodev.divami.com/";

    // Google auth
    $AppGlobal['googleauth']['App']['clientId'] = "620805159491-maiv301gjres7gdbn7k0e8lgg1lnebm9.apps.googleusercontent.com";
    $AppGlobal['googleauth']['App']['clientSecret'] = "Gi4obPHtddRfZ9AjHtL_6ELu";
}
elseif($host == "kenseo.divami.com"){
    $AppGlobal['global']['domain'] = "https://kenseo.divami.com/";
}
?>