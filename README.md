
# Jade Browser

  Middleware for express/connect to expose jade templates to the web browser. It provides a few additional features like express-like render function with partial handling.
  
    var express = require('express')
      , jade_browser = require('jade-browser')
      , app = express.createServer();
      
    app.use(jade_browser(url_endpoint, template_dir, options));
    
## Installation

    $ npm install jade-browser
  
## Features

  * Jade templates are served as compiled functions.
    * removes browser compatibility issues
    * increases speed of template execution
    * reduces file transfer size
  * ability to minify output
  * option to attach cache control
  * provides helpers for handling rendering/partials just like express.
  * relative path handling even from within partials.
  
## Credit

  Large amounts of this code is inspired by TJ. Parts of express-expose and internal parts of express are recycled to make this happen.

## Contributors

    * Nathan White ([nw](http://github.com/nw))
    
## License 

(The MIT License)

Copyright (c) 2009-2011 Storify &lt;info@storify.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.