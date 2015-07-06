cd "C:\Program Files\Sublime Text 3"
start sublime_text.exe
start cmd /k c:\xampp\apache_start.bat
start cmd /k c:\xampp\mysql_start.bat

:: http://stackoverflow.com/a/22888163/1577396

cd "C:\Program Files (x86)\Mozilla Firefox" 
start chrome.exe https://mail.google.com/mail/u/0 https://mail.google.com/mail/u/1 http://localhost/kenseo/ui https://docs.google.com/spreadsheets/d/19900K8Nd8rQAWZ_RAaHJq3DUHYTjcVKvCC66XcBe5u0/edit#gid=668558537 stackoverflow.com
cd c:\xampp\htdocs\kenseo\ui\assets\styles
start sass --watch sass:css
cd c:\xampp\htdocs\kenseo\ui
start babel --blacklist strict "js/babel-app" --watch --out-dir js/app --source-maps inline
start gulp watch
start c:\xampp\htdocs\kenseo
exit