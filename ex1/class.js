var teacher = require('./teacher')
var student = require('./student')

function add(tea,stuArg){
	teacher.add(tea);
	stuArg.forEach(function(item, index){
		student.add(item);
	});
}	

exports.add = add