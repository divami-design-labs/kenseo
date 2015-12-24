***** Project Setup *****
1. Change server/config/config.php
	$AppGlobal['log']['path'] = "E:\\tmp\\kenseo.log" ;				// <path_to_any_folder>/kenseo.log
	$AppGlobal['global']['domain'] = "http://localhost/kenseo/";	// <path_to_project_folder>/
	$AppGlobal['gloabl']['storeLocation'] = "media/";

2. Change server/config/database.php
	$AppGlobal['db']['username'] = "root";		// DB username
	$AppGlobal['db']['password'] = "";			// DB password
	$AppGlobal['db']['database'] = "kenseo";	// DB name

3. Change server/.htaccess
	RewriteBase /kenseo/server/					// It should be a path to a folder which has index.php

4. Change ui/babel-app/config/domain_urls.js
	var DOMAIN_ROOT_URL = "http://localhost/kenseo/server/";	// <path_to_folder_which_has_index.php>/
	var DOMAIN_UI_URL   = "http://localhost/kenseo/ui/";		// <path_to_folder_which_has_index.html>/

5. Database creation:
	- Create a database named "kenseo"
	- Import db/kenseo.sql file into it. This will create tables
	- Import db/kenseo-changes.sql file into it. This will insert table data.




***** DB Changes *****
1. ALTER TABLE  `artefacts` CHANGE  `state`  `state` CHAR( 1 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  'O' COMMENT  'O-Open D-Delete A-Archive'