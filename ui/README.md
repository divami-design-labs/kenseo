// View this file using https://stackedit.io/editor (it doesn't store any data)

##Kenseo Development Team

###Note:

We are using Backbone.js to write the code in MVC structure. So, please follow backbone structure.

###Templating:

For templating, we are using [Browserify](http://browserify.org/) with its plugin [brfs](https://github.com/substack/brfs)

###Getting Started:

- Intall Node.js
- Install browserify

        npm install browserify -g

- Install brfs

        npm install brfs -g

You can do the above steps manually or run `builds/starter.bat` file in the command prompt.

If you want to watch the `main.js` file, you can install [watchify](https://www.npmjs.com/package/watchify).

    npm install watchify -g

and then 

    watchify main.js -o bundle.js

###Adding a Template:

- Add `.html` file of the template in `app/templates` folder with a recognizable name.
- In `main.js` file, add a property to the `templates` object. The property name should be similar to the created `.html` file.

        var templates = {
	         'header': fs.readFileSync('app/templates/header.html', 'utf8'),
		      // other properties
        }

- Open command prompt
- Drag and drop `builds/template.bat` file in the command prompt and press enter.
