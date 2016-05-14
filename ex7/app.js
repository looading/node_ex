const fs = require('fs')
fs.unlink('./chat.js', (err) => {
	if(err) throw err
	console.log('successfuly deleted ./chat.js')
})
