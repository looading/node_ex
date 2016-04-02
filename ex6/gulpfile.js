var browserSync = require('browser-sync')
var reload = browserSync.reload

var gulpChild = require('./gulp-child')
var restart = gulpChild.restart

var gulp = require('gulp')
gulp.task('createChild', function() {
	gulpChild.init({
		bin : 'node',
		main : ['app.js'],
		stdout : function(data){
			console.log('stdout : ' + data + '\n')
		},
		stderr : function(data){
			console.log('stderr : ' + data + '\n')
		},
		closeCb : function(code){
			console.log(121312)
			console.log(`child process exited with code ${code}`)
		}
	})	
})

gulp.task('killChild', function() {
	gulpChild.close()
})

gulp.task('proxy', function() {
	browserSync.init({
		proxy : 'http://localhost:3000',
		port : 8888
	})
})

gulp.task('watch', function() {
	gulp.watch(['*.js', '*.css', '*.html']).on('change', function(){
		restart(reload)
	})

})

gulp.task('default', ['createChild','proxy', 'watch'])