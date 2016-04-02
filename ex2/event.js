var EventEmitter = require('events').EventEmitter


var life = new EventEmitter()

//事件
function water(who){
	console.log('给' + who + '倒水')
}

life.on('倒水',water)
life.on('倒水',function(who){
	console.log('给' + who + '1 倒水')
})
life.on('倒水',function(who){
	console.log('给' + who + '2 倒水')
})
life.on('倒水',function(who){
	console.log('给' + who + '3 倒水')
})
life.on('倒水',function(who){
	console.log('给' + who + '4 倒水')
})
life.on('倒水',function(who){
	console.log('给' + who + '5 倒水')
})
life.on('倒水',function(who){
	console.log('给' + who + '6 倒水')
})
life.on('倒水',function(who){
	console.log('给' + who + '7 倒水')
})
life.on('倒水',function(who){
	console.log('给' + who + '8 倒水')
})


life.emit('倒水','汉子')

console.log(life.listeners('倒水').length)

life.removeListener('倒水',water)

console.log(life.listeners('倒水').length)

life.removeAllListeners('倒水',water)

console.log(life.listeners('倒水').length)