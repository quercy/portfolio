var argv = require('minimist')(process.argv.slice(2));
var Metalsmith = require('metalsmith');
var sass = require('metalsmith-sass');
var layouts = require('metalsmith-layouts');
var watch = require('metalsmith-watch');
var permalinks = require('metalsmith-permalinks');
var ignore = require('metalsmith-ignore');
var uglify = require('metalsmith-uglify');
// var branch = require('metalsmith-branch');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var moment = require('moment');
var browserify = require('browserify');
var site_title = "quercy.co";
var fs = require("fs");
var description = "";

var my_plugin = function (options) {
    return function (files, metalsmith, done) {
        // console.log(metalsmith._metadata.posts[0].path);
        done();      
    };
};

handlebars.registerHelper('date', function(date) {
  date = handlebars.escapeExpression(date);
  date = moment(date, "ddd MMM D YYYY HH:mm:ss").add(6, 'hours').format("M - D - YYYY");
  return new handlebars.SafeString(
    "<div class='date'>" + date + "</div>"
  );
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
        // },
        // pages : {
        //     "pattern" : "*.html",
        //     "name" : ""
        // }
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
    // .use(concat({
    //     "files": "js/*.js",
    //     "output" : "js/app.js"
    // }))
    // .use(uglify())

        .use(my_plugin())
    .ignore(['layouts', '.DS_Store', 'site.js', '*.js'])
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
}

ms.build(function(err) {
    if (err) {
        throw err;
    } 
  });
