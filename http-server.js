var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')

//process.env.PWD = process.cwd()
var baseDirectory = path.join(__dirname, '/public')   // or whatever base directory you want

var port = process.env.PORT || 80

http.createServer(function (request, response) {
   try {
     var requestUrl = url.parse(request.url)

     // need to use path.normalize so people can't access directories underneath baseDirectory
     console.log(requestUrl.pathname)
     var fsPath = requestUrl.pathname!=='/' ? path.join(baseDirectory, path.normalize(requestUrl.pathname)) : path.join(baseDirectory, 'index.html')

     response.writeHead(200)
     var fileStream = fs.createReadStream(fsPath)
     fileStream.pipe(response)
     fileStream.on('error', function(e) {
         response.writeHead(404)     // assume the file doesn't exist
         response.end()
     })
   } catch(e) {
     response.writeHead(500)
     response.end()     // end the response so browsers don't hang
     console.log(e.stack)
   }
}).listen(port)

console.log('listening on port ' + port)
