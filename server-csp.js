var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

var serve = serveStatic('CSP/', {
  'index': "csp.html",
  'setHeaders': setHeaders
})

function setHeaders (res, path) {
  res.setHeader('Content-Security-Policy', "script-src 'nonce-1234567890';")
}

var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})

server.listen(8000)
