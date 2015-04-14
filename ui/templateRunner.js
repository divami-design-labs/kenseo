var fs = require('fs');
var templates = {
	'header': fs.readFileSync('app/templates/header/header.html', 'utf8'),
	'nav-menu':fs.readFileSync('app/templates/menu/nav-menu.html', 'utf8'),
	'db-notifications': fs.readFileSync('app/templates/dashboard/db-notifications.html', 'utf8'),
	'db-projects-section': fs.readFileSync('app/templates/dashboard/db-projects-section.html', 'utf8'),
	'db-review-requests': fs.readFileSync('app/templates/dashboard/db-review-requests.html', 'utf8'),
	'projects-page': fs.readFileSync('app/templates/projectspage/projects-page.html', 'utf8'),
	'artifacts': fs.readFileSync('app/templates/projectspage/artifacts.html', 'utf8'),
	'people': fs.readFileSync('app/templates/projectspage/people.html', 'utf8'),
	'activities': fs.readFileSync('app/templates/projectspage/activities.html', 'utf8'),
    'menu-header': fs.readFileSync('app/templates/menu/menu-header.html', 'utf8'),
    'menu-projects-container': fs.readFileSync('app/templates/menu/menu-projects-container.html', 'utf8'),
    'menu-recent-activity': fs.readFileSync('app/templates/menu/menu-recent-activity.html', 'utf8'),
    'menu-recent-requests': fs.readFileSync('app/templates/menu/menu-recent-requests.html', 'utf8'),
    'menu-recent-notifications': fs.readFileSync('app/templates/menu/menu-recent-notifications.html', 'utf8'),
    'menu-recent-people': fs.readFileSync('app/templates/menu/menu-recent-people.html', 'utf8'),
    'search': fs.readFileSync('app/templates/header/search.html', 'utf8'),
    'search-results': fs.readFileSync('app/templates/header/search-results.html', 'utf8'),
    'add-artefact': fs.readFileSync('app/templates/addartefact/add-artefact.html', 'utf8'),
    'add-artefact-two': fs.readFileSync('app/templates/addartefact/add-artefact-two.html', 'utf8'),
    'dropdown': fs.readFileSync('app/templates/common/dropdown.html', 'utf8')
};