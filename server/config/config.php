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
    $AppGlobal['googleauth']['App']['clientId'] = "428813717734-jgk34bp4inhkvuddlcfgditm65qsl7d6.apps.googleusercontent.com";
    $AppGlobal['googleauth']['App']['clientSecret'] = "wMnT4Wc48bfwzeG2arPS5zzP";
}
elseif($host == "demo.divami.com"){
    $AppGlobal['global']['domain'] = "http://demo.divami.com/kenseodev/";
    $AppGlobal['log']['path'] = "/tmp/kenseo-dev.log";

    // Google auth
    $AppGlobal['googleauth']['App']['clientId'] = "194500406128-o176t7qdbphvmuohtnh5svou12shocos.apps.googleusercontent.com";
    $AppGlobal['googleauth']['App']['clientSecret'] = "_iFqI-1G5XzdAZNj6f0IWYRJ";
}
elseif($host == "kenseo.divami.com"){
    $AppGlobal['global']['domain'] = "https://kenseo.divami.com/";
    $AppGlobal['log']['path'] = "/tmp/kenseo.log";

    $AppGlobal['googleauth']['App']['clientId'] = "352389051162-3vrdf3p8kbbujc718go5ih5timkgijmn.apps.googleusercontent.com";
    $AppGlobal['googleauth']['App']['clientSecret'] = "3XVDqD2L4ChWaHRkyUhlQtXW";
}
?>