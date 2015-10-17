var argv = require('minimist')(process.argv.slice(2));
var Metalsmith = require('metalsmith');
var sass = require('metalsmith-sass');
var layouts = require('metalsmith-layouts');
var watch = require('metalsmith-watch');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var ignore = require('metalsmith-ignore');
var concat = require('metalsmith-concat');

var ms = Metalsmith(__dirname)
    .source('src')
    .destination('./build')
        .use(sass({
        "outputStyle": "expanded",
        "outputDir" : ""
    }))
    .metadata({
        "site_title" : "site title",
        "description": ""
    })
    .use(markdown({
        html: true
    }))
    .use(layouts({
        "engine":"handlebars",
        "directory" : "src/layouts/",
        "default" : "template.html",
        "pattern" : "*.html"
    }))
    .use(permalinks({
        "pattern":":title"
    }))
    .use(concat({
        "files": "js/*.js",
        "output" : "app.js"
    }))
    .ignore(['layouts']);

  if (argv.watch) {
    ms.use(watch({
        paths:{
            "${source}/**/*": "**/*"
        },
        livereload: true
    }));
}

ms.build(function(err) {
    if (err) throw err;
  });