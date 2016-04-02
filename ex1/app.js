var http = require('http')
var klass = require('./class')

http.createServer(function(req,res){
	res.writeHead(200,{
		'Content-Type':'text/image',
		'secret':'ctyloading'
	});
	res.end('hello world!')
})

.listen(3000,'127.0.0.1',function(){
	console.log('server is running !');
	console.log(klass);
	klass.add('ctyloading',['小胡子','大胡子','小虎菜','打虎菜']);
})