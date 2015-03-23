// var browserify = require('browserify');
var fs = require('fs');
var templates = {
	'header': fs.readFileSync('app/templates/header.html', 'utf8'),
	'heading': fs.readFileSync('app/templates/heading.html', 'utf8')
};