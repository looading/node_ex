var fs = require('fs')
var data = ''
var i = 0

var readerStream = fs.createReadStream('input.txt')

readerStream.setEncoding('UTF8')

readerStream.on('data', function(chunk) {
	console.log(i++)
	data += chunk
	
})

readerStream.on('end', function() {
	console.log(data)
})

readerStream.on('error', function(err) {
	console.log(err);
})

console.log('end');

