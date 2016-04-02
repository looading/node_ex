var http = require('http')
var fs =require('fs')
var mime = require('mime')
var path = require('path')
var chat = require('./chat_server')
var cache = {}

// 发送404错误
function send404(res) {
	res.writeHead(404, {'Content-Type':'text/plain'})
	res.write('Error 404 : resource not found')
	res.end()
}

// 发送文件
function sendFile (res, filePath, fileContents) {
	res.writeHead(
			200,
			{
				'Content-Type' : mime.lookup(path.basename(filePath))
			}
		)
	res.end(fileContents)
}

// 提供静态文件服务 利用缓存
function serverStatic(res, cache, absPath) {
	if(cache[absPath] && false){
		sendFile(res, absPath, cache[absPath])
	} else {
		fs.exists(absPath, function(exists) {
			if(exists) {
				fs.readFile(absPath, function(err, data) {
					if(err) {
						send404(res)
					} else {
						cache[absPath] = data
						sendFile(res, absPath, data)
					}
				})
			} else {
				send404(res)
			}
		})
	}
}

var server = http.createServer(function(req, res) {
	var filePath = false
	if (req.url == '/') {
		filePath = 'index.html'
	} else {
		filePath = req.url
	}
	var absPath = './' + filePath

	serverStatic(res, cache, absPath)
})

chat.listen(server)

server.listen(3000, function() {
	console.log('Server listening on port 3000.12312')
})