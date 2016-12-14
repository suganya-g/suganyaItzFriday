module.exports = function() {
   var jsonServer = require('json-server')

var server = jsonServer.create()

server.use(jsonServer.defaults)
server.use('/authentication', jsonServer.router('authentication.json'))
server.use('/projectMap', jsonServer.router('projectMap.json'))

server.listen(3000)

  
}