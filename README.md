# portfolio
The system used to build my static portfolio.

## Requirements
- node
- npm

## Building
The static builder uses make.
    make
    
Will install all required node modules and then do an initial build to ./build.

    make watch
    
Will run continuously - whenever the SASS files, templates, or layouts are modified, it will rebuild the site.

    make dev
    
Same as make watch, except a live reload script is included (when any files are modified, the site will automatically reload in your browser).
