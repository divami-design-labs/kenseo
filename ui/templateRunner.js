var fs = require('fs');
var templates = {
	'header': fs.readFileSync('app/templates/header.html', 'utf8'),
	'nav-menu': fs.readFileSync('app/templates/nav-menu.html', 'utf8'),
	'db-notifications': fs.readFileSync('app/templates/db-notifications.html', 'utf8'),
	'db-projects-section': fs.readFileSync('app/templates/db-projects-section.html', 'utf8'),
	'db-review-requests': fs.readFileSync('app/templates/db-review-requests.html', 'utf8'),
	'projects-page': fs.readFileSync('app/templates/projects-page.html', 'utf8')
};