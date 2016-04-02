var http = require('http')

http
	.createServer(function(req,res){
		res.writeHead(200,{
			'Content-Type':'text/plain',
			'myself':'ctyloaidng'
		})
		res.write('hello ctyloading')
		res.end()
	})	

	.listen(4444,function(){
		console.log('server is running!')
	})