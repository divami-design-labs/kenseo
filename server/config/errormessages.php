<?php

global $AppGlobal;

$AppGlobal['error'] = array();

$AppGlobal['error']['EXC_GENERIC'] = "Generic Server Error";
$AppGlobal['error']['EXC_INTERNAL'] = "Internal Error";
$AppGlobal['error']['EXC_INTERNAL_MSG'] = "Internal Error %0%";
$AppGlobal['error']['EXC_INVPARAMS'] = "Internal Error: Invalid Parameters in function invocation %0%";

$AppGlobal['error']['EXC_RESPONDER_NOT_FOUND'] = "Unable to find request: %0% in Command Interpreter file.";
$AppGlobal['error']['EXC_URL_RESPONDER_NOT_FOUND'] = "Unable to find request: %0% in URL Routre Mapping file.";
$AppGlobal['error']['EXC_RESPONDER_CLASS_NOT_FOUND'] = "Responder class: %0% not found for request: %1%";
$AppGlobal['error']['EXC_RESPONDER_FILE_NOT_FOUND'] = "Unable to find Responder file %0% to handle request: %1%";
$AppGlobal['error']['EXC_RESPONDER_METHOD_NOT_FOUND'] = "Responder class %0% does not respond to %1% method to handle request: %2%";
$AppGlobal['error']['EXC_DB_ERROR'] = "Internal DB Error: %0%";
$AppGlobal['error']['EXC_MISSING_QUERY'] = "Unable to locate query: %0% in Query XML file";
$AppGlobal['error']['EXC_FUN_FILE_NOT_FOUND'] = "Unable to find file: %0%";

$AppGlobal['error']['EXC_AUTH_FAILURE'] = "Authentication Failure";

$AppGlobal['error']['EXC_EDIT_OLDDATA'] = "%0%";

?>