#!/bin/bash
#this is a comment-the first line sets bash as the shell script

cd /Applications/XAMPP/htdocs/kenseo/ui
gulp watch
cd /Applications/XAMPP/xamppfiles/
sudo ./xampp start
sudo bin/mysql.server start
