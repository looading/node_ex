var browserSync = require('browser-sync')
var reload = browserSync.reload
var gulp = require('gulp')
var gulpServer = require('gulp-server')
var restart = gulpServer.restart

gulp.task('createChild', function() {
	gulpServer.init({
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
	gulpServer.close()
})

gulp.task('proxy', function() {
	browserSync.init({
		proxy : 'http://localhost:3000',
		port : 8888
	})
})

gulp.task('watch', function() {
	gulp.watch('*.js').on('change', restart)
})

gulp.task('default', ['createChild','proxy'])