var argv = require('minimist')(process.argv.slice(2));
var Metalsmith = require('metalsmith');
var sass = require('metalsmith-sass');
var layouts = require('metalsmith-layouts');
var watch = require('metalsmith-watch');
var permalinks = require('metalsmith-permalinks');
var ignore = require('metalsmith-ignore');
var uglify = require('metalsmith-uglify');
var branch = require('metalsmith-branch');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var moment = require('moment');
var concat = require('metalsmith-concat');
var browserify = require('browserify');
var site_title = "quercy.co";
var fs = require("fs");
var description = "";

handlebars.registerHelper('date', function(date) {
  date = handlebars.escapeExpression(date);
  date = moment(date, "ddd MMM D YYYY HH:mm:ss").add(6, 'hours').format("M - D - YYYY");
  return new handlebars.SafeString(
    "<div class='date'>" + date + "</div>"
  );
});

handlebars.registerHelper('log', function(msg) {
    var fmtd = "";
    if(typeof(msg) === "object") {
        fmtd += " { \n";
        for(prop in msg) {
            fmtd += "\t" + prop + " : " + (typeof(msg[prop]) === "string" ? "\"" + msg[prop] + "\"" : msg[prop]) + "\n";
        }
        fmtd += " } \n";
    } else {
        fmtd = msg;
    }
    
    console.log(fmtd);
});

handlebars.registerHelper('chopString', function(passedString, start) {
    var theString = passedString.substring(start, passedString.length);
    return new handlebars.SafeString(theString)
});

var ms = Metalsmith(__dirname)
    .source('src')
    .metadata({
        "site_title" : site_title,
        "description": ""
    })

    .use(sass({
        "outputStyle": "expanded",
        "outputDir" : "css/"
    }))
    .use(collections({
        posts : {
            "pattern": "posts/**/*",
            "sortBy": 'date',
            "reverse": true
        }
    }))
    .use(permalinks({
        pattern: "./:collection/:title",
        relative:false
    }))
    .use(layouts({
        "engine" : "handlebars",
        "default" : "template.hbt",
        "partials" : "layouts/partials",
        "pattern" : "**/*.html"
    }))
    .use(concat({
        "files": ["js/jquery.js", "js/velocity.js", "js/js-cookie.js", "js/site.js"],
        "output" : "js/app.js"
    }))
    .use(uglify())
    .ignore(['layouts', '.DS_Store'])
    .destination('./build');

if (argv.watch) {
    ms.use(watch({
        paths:{
            "${source}/**/*": "**/*"
        },
        livereload: true
    }));
}

if(argv.dev) {
    ms.metadata({
        "dev" : true,
        "site_title" : site_title,
        "description" : description
    });
} else {
        ms.metadata({
        "dev" : false,
        "site_title" : site_title,
        "description" : description
    });
}

ms.build(function(err) {
    if (err) {
        throw err;
    } 
  });
