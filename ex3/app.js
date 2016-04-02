var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var bodyParser = require('body-parser')
var http = require('http')
var cheerio = require('cheerio')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views','./views/pages')
app.set('view engine','jade')

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.locals.moment = require('moment')

app.get('/',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index.jade',{
			title:'电影',
			movies: movies
		})
	})
})
app.get('/admin',function(req,res){
	res.render('admin',{
		title:'imooc admin',
		movie:{
			// _id: '1',
			title:'',
			doctor:'',
			country:'',
			language:'',
			poster:'',
			flash:'',
			year:'',
			summary:''
		}
	})
})
app.get('/movie/:id',function(req,res){
	var id = req.params.id
	Movie.findById(id,function(err,movie){
		if(err){
			console.log(err)
		}
		console.log(movie)
		res.render('detail',{
			title:movie.title + '－－详情',
			movie:movie
		})
	})
})
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id
	if(id){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}
			res.render('admin',{
				title:'后台录入更新',
				movie:movie
			})
		})
	}
})
app.get('/admin/list',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		// console.log(movies);
		res.render('list',{
			title:'影片列表',
			movies:movies
		})
	})	
})
app.delete('/admin/list',function(req,res){
	var id = req.query.id
	if(id){
		Movie.remove({
			_id:id
		},function(err,movie){
			if(err){
				console.log(err)
			}
			else{
				res.json({
					success:1
				})
			}
		})
	}
})
app.post('/admin/movie/new',function(req,res){
	// console.log(req)
	var id = req.body.movie._id 
	var movieObj = req.body.movie
	var _movie

	if(id !== 'undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}
			_movie = _.extend(movie,movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
			})
		})
	}else{
		// console.log(1)
		// console.log(Movie)
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			language: movieObj.language,
			country: movieObj.country,
			summary: movieObj.summary,
			flash: movieObj.flash,
			poster: movieObj.poster,
			year: movieObj.year
		})
		// console.log(2)
		_movie.save(function(err,movie){
			if(err){
				console.log(err)
				// console.log(4)
			}
			// console.log(3)
			res.redirect('/movie/' + movie._id)
		})

	}
})

app.get('/crawler',function(req,res){
	var url = 'http://v.baidu.com/'
	http.get(url,function(res_1){
		var html = ''
		res_1.on('data',function(data){
			html += data
		})
		res_1.on('end',function(){
			res.end(html)
		})
	}).on('error',function(){
		console.log('获取数据失败')
	})
	
})
console.log(port)
app.listen(port,function(){
	console.log('server is running on ' + port);
})



