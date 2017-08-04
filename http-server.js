var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var qs = require('querystring')
var mail = require('./mail')

var baseDirectory = path.join(__dirname, '/public')
var port = process.env.PORT || 80

http.createServer(function (request, response) {
   try {
     var requestUrl = url.parse(request.url)

     if (requestUrl.pathname === '/sendMail' && request.method === 'POST') {
       const chunks = []
       request.on('data', chunk => chunks.push(chunk))
       request.on('end', () => {
         const data = qs.parse(Buffer.concat(chunks).toString())
         mail.sendMail(data).then (function (res, err) {
            res ? response.writeHead(200) : response.writeHead(500)
          })
         response.end()
       })
     }

     var fsPath = requestUrl.pathname !== '/' ? path.join(baseDirectory, path.normalize(requestUrl.pathname)) : path.join(baseDirectory, 'index.html')

     response.writeHead(200)
     var fileStream = fs.createReadStream(fsPath)
     fileStream.pipe(response)
     fileStream.on('error', function(e) {
         response.writeHead(404)
         response.end()
     })
   } catch(e) {
     response.writeHead(500)
     response.end()     // end the response so browsers don't hang
     console.log(e.stack)
   }
}).listen(port)

console.log('http-server started. listening on port ' + port)
