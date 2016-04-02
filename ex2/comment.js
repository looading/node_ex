var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
	content:'just for test!',
	cid:539
});

var options = {
	hostname:'www.imooc.com',
	port:80,
	path:'/course/docomment',
	method: 'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=d3e4699a-2705-4658-b81f-9a2b6be7b698; imooc_isnew=1; imooc_isnew_ct=1453288112; IMCDNS=0; PHPSESSID=d8eopb05inlv5b3497h5u1hfh2; loginstate=1; apsid=lkYzM5MjU4YWJlY2ZiNjNkMjkzMTE1ZjFlMmJmNDcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTA0NDE1MQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5NDY1MDU4MDhAcXEuY29tAAAAAAAAAAAAAAAAAAAAADJlOWFlMzQzNjMwMTExOTUwMzhiMTk3NzRlNjFkYTdjNnGfVjZxn1Y%3DYj; last_login_username=946505808%40qq.com; cvde=569f6ab0b2b1d-118; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1453288115; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1453356811',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/comment/539',
		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}

}


var req = http.request(options, function(res){
	console.log('Status : ' + res.statusCode)
	console.log('headers : ' + JSON.stringify(res.headers))
	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
	})
	res.on('end',function(){
		console.log('评论完毕!')
	})

	


})

req.on('err',function(e){
		console.log('Error : ' + e.message)
	})

req.write(postData)

req.end()