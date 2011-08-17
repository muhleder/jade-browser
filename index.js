var fs = require('fs')
  , jade = require('jade')
  , parser = require('uglify-js').parser
  , compiler = require('uglify-js').uglify
  , Expose = require('./lib/expose')
  , render = require('./lib/render').render
  , utils = require('./lib/utils')
  , built = false;

module.exports = function(path, dir, options){
  var options = options || {}
    , ext = options.ext || 'jade'
    , namespace = options.namespace || 'jade'
    , minify = options.minify || false
    , maxAge = options.maxAge || 86400
    , path = path.replace(/\/$/,'')
    , dir = dir.replace(/\/$/,'')
    , regexp = utils.toRegExp(path, true)
    , payload = new Expose()
    , templates = {}
    , headers = {
        'Cache-Control': 'public, max-age=' + maxAge
      , 'Content-Type': 'text/javascript' 
      };

  return function(req, res, next){
    if(!req.url.match(regexp)){
       return next();
    }
    if(built){ 
      res.writeHead(200, headers);
      res.end(built);
     } else {
       utils.walk(dir, function(results){
         var file;
         (function getFile(){
           if((file = results.shift()) && file.match(ext+'$')){
             var filename = file.replace(dir+'/', '');
             fs.readFile(file, 'utf8', function(err, content){
               if(!err){
                 var tmpl = jade.compile(content,{filename: filename, inline: false, compileDebug: false});
                 if(typeof tmpl == 'function') templates[filename] = (function(){
                   var fn = 'var jade='+namespace+'; return anonymous(locals);'+ tmpl.toString();
                   return new Function('locals', fn);
                 })();
               }
               process.nextTick(getFile);
             }); 
           } else {
             payload.expose({
                attrs: jade.runtime.attrs
              , escape: jade.runtime.escape
              , dirname: utils.dirname
              , normalize: utils.normalize
              , render: render(namespace)
              , templates: templates
              }, namespace, 'output');
             built = payload.exposed('output');
             if(minify){
               var code = parser.parse(built); // parse code and get the initial AST
               code = compiler.ast_mangle(code); // get a new AST with mangled names
               code = compiler.ast_squeeze(code); // get an AST with compression optimizations
               built = compiler.gen_code(code); // compressed code here
             }
             res.writeHead(200, headers);
             res.end(built);
           } 
          })();
       });
     }
   }
}