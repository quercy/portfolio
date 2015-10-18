var argv = require('minimist')(process.argv.slice(2));
var Metalsmith = require('metalsmith');
var sass = require('metalsmith-sass');
var layouts = require('metalsmith-layouts');
var watch = require('metalsmith-watch');
var permalinks = require('metalsmith-permalinks');
var ignore = require('metalsmith-ignore');
var concat = require('metalsmith-concat');
var uglify = require('metalsmith-uglify');
var branch = require('metalsmith-branch');
var site_title = "quercy.co";
var description = "";

var ms = Metalsmith(__dirname)
    .source('src')
    .use(moveFiles())
    .destination('./build')
        .use(branch('sass/*')
            .use(
                sass({
                "outputStyle": "expanded",
                "outputDir" : ""
            })
        ))
    .metadata({
        "site_title" : site_title,
        "description": ""
    })
    .use(layouts({
        "engine":"handlebars",
        "directory" : "src/layouts/",
        "default" : "template.html",
        "pattern" : "*.html"
    }))
    // .use(permalinks({
    //     "pattern":":title"
    // }))
    .use(concat({
        "files": "js/*.js",
        "output" : "app.js"
    }))
    .use(uglify())
    .ignore(['layouts', '.DS_Store']);
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
        console.log("HEY!");
        throw err;
    } 
  });