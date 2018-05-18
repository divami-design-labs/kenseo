New setup instructions:
======================
- Under php.ini file, make display_errors = Off (Restart Apache after this change)
- In node_modules/gulp-lodash-template/index.js, replace "var _ = {}" to "var _ = window._ || {}" everywhere (currently, can see at two places)
