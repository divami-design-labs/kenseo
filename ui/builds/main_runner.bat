cd c:\xampp\
start cmd /k c:\xampp\apache_start.bat
start cmd /k c:\xampp\mysql_start.bat
cd c:\xampp\htdocs\kenseo\ui\assets\styles
start sass --watch sass:css
cd c:\xampp\htdocs\kenseo\ui
start gulp watch
exit