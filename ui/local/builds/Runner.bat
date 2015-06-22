cd "C:\Program Files\Sublime Text 3"
start sublime_text.exe
start cmd /k c:\xampp\apache_start.bat
start cmd /k c:\xampp\mysql_start.bat

:: http://stackoverflow.com/a/22888163/1577396

cd "C:\Program Files (x86)\Mozilla Firefox" 
start chrome.exe http://localhost/kenseo/ui https://mail.google.com/mail/u/1 https://mail.google.com/mail/u/0 stackoverflow.com
cd c:\xampp\htdocs\kenseo\ui\assets\styles
start sass --watch sass:css
:: start babel --blacklist strict "js/babel-app" --watch --out-dir js/app
cd c:\xampp\htdocs\kenseo\ui
start gulp watch
start c:\xampp\htdocs\kenseo
exit