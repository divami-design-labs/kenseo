// View this file using https://stackedit.io/editor (it doesn't store any data)

##Kenseo Development Team

###Note:

We are using [Backbone.js](http://backbonejs.org/) to write the code in MVC structure. So, please follow backbone structure.

###Getting Started:

- Keep the project folder in `C:\xampp\htdocs\` with name `Kenseo`.
- Install [Node.js](https://nodejs.org/)
- Install [Ruby 1.9.3p551](http://rubyinstaller.org/downloads/) (_stable version_)
- Install sass through Ruby command prompt. `gem install sass`.
- Open Windows Command prompt
- Drag and drop `Kenseo/ui/builds/starter.bat` file in the command prompt.
- Press Enter (if necessary)
- Wait till all the files are installed. 
- Now you are good to go.

###Templating:

For templating, we are using [Browserify](http://browserify.org/) with its plugin [brfs](https://github.com/substack/brfs) and [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) to watch the template changes.

###Adding a Template:

- Add `.html` file of the template in `app/templates` folder with a recognizable name.
- In `main.js` file, add a property to the `templates` object. The property name should be similar to the created `.html` file.

        var templates = {
	         'header': fs.readFileSync('app/templates/header.html', 'utf8'),
		      // other properties
        }

