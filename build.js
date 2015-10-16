var argv = require('minimist')(process.argv.slice(2));

var Metalsmith = require('metalsmith');
var sass = require('metalsmith-sass');
var layouts = require('metalsmith-layouts');
var watch = require('metalsmith-watch');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var ignore = require('metalsmith-ignore');


var ms = Metalsmith(__dirname)
    .source('src/')
    .destination('./build')
    .metadata({
        "site_title" : "quercy.co",
        "description": "My statically generated portfolio"
    })
    .use(markdown())
    .use(sass({
        "outputStyle": "expanded"
    })) 
    .use(permalinks({
        "pattern":":title"
    }))
    .use(layouts({
        "engine":"swig",
        "directory" : "src/layouts",
        "default" : "template.html",
        "pattern" : "*.md"
    }))
    .ignore(['layouts']);

  if (argv.watch) {
    ms.use(watch({
        pattern: ['**/*'],
        livereload: true
    }));
}

ms.build(function(err) {
    if (err) throw err;
  });