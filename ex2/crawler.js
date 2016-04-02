var http = require('http')
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/348'


function filterChapter(html){
	var $ = cheerio.load(html)
	var chapters = $('.chapter')
	// console.log(chapters)
	var course = []
	chapters.each(function(item){
		var chapter = $(this)
		var courseData = {
			title: chapter.find('h3 strong').text(),
			videos:[]
		}
		videoList = chapter.find('li')
		videoList.each(function(item,index){
			videoDetail = $(this)
			var videoListData = {
				title: videoDetail.find('a').text(),
				href: url + videoDetail.find('a').attr('href')
			}
			// console.log(videoListData)
			courseData.videos.push(videoListData)
		})
		course.push(courseData)
	})

	// console.log(course)
	return course
}

function print_course(course){
	course.forEach(function(item,index){
		var chapter_title = item.title
		console.log(chapter_title + '\n')

		item.videos.forEach(function(item,index){
			var video_title = item.title
			var video_href = item.href

			console.log('  ［ '+ video_href +' ］' + video_title + '\n')
		})
	})
}

http.get(url, function(res){
	var html = ''
	res.on('data',function(data){
		html += data
	})
	res.on('end',function(){
		var course = filterChapter(html)
		print_course(course)
	})

}).on('error',function(){
	console.log('获取课程数据出错!')
})