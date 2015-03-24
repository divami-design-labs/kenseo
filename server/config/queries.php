<?php

//here we will write a constraints for sql queries

global $AppGlobal;

$AppGlobal['sql'] = array();

//$AppGlobal['sql']['getDivamiHolidays'] = "SELECT * from ". TABLE_DIVAMI_HOLIDAYS;
$AppGlobal['sql']['validateSID'] = "SELECT employee.id, employee.email, auth_session.expiry 
										FROM " . TABLE_AUTH_SESSION ." as auth_session, 
										". TABLE_EMPLOYEE ." as employee
										WHERE auth_session.sid = @~~sid~~@ AND auth_session.expiry > @~~now~~@
												AND auth_session.userid = employee.id AND employee.status = 'Active'";
$AppGlobal['sql']['getActiveUserId'] = "SELECT id 
											FROM ". TABLE_EMPLOYEE ." 
											WHERE username = @~~userName~~@ AND email = @~~email~~@ AND status = 'Active'";

		 
?>
