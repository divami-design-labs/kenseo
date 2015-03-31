<?php

//Here we will map API names to the local class and functions

//Here we need to define the both url based api and command map as a group

global $AppGlobal;

$AppGlobal['cmdmap'] = array();
$AppGlobal['urlmap'] = array();

$AppGlobal['cmdmap']['getCustomers'] = array ("class" => "Customers", "method" => "getCustomers");
$AppGlobal['urlmap']['/getCustomers'] = array ('command' => 'getCustomers', 'type' => 'POST');


?>
