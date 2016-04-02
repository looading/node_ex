var socket = require('socket.io')
var io,
	guestNumber = 1,
	nickName	= {},
	namesUsed	= [],
	currentRoom	= {}
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
	var name = 'Guest' + guestNumber
	nickNames[socket.id] = room
	socket.emit('nameRequest', {
		success : true,
		name 	: name
	})
	nameUsed.push(name)
	return guestNumber + 1;
}
function joinRoom(socket, room) {
	socket.join(room)
	currentRoom[socket.io] = room
	socket.emit('joinResult', {
		room : room
	})
	socket.broadcast.to(room).emit('message', {
		text : nickNames[socket.id] + 'has joined' + room + '.'
	})
	var usersInRoom = io.sockets.clients(room)
	if(usersInRoom.length > 1) {
		var usersInRoomSummary = 'Users currently in' + room + ': ' + ;
		for (var index in usersInRoom) {
			var userSocketId = usersInRoom[index].id
			if(userSocketId != socket.id) {
				if(index > 0) {
					usersInRoomSummary += ', '
				}
				usersInRoomSummary += nickNames[userSocketId]
			}
		}
		usersInRoomSummary += '.'
		socket.emit('message', {
			text : usersInRoomSummary
		})
	}

}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
	socket.on('nameAttempt', function(name) {
		if(name.indexOf('Guest') === 0) {
			socket.emit('nameResult', {
				success : false,
				message : 'Names cannot begin with "Guest"'
			})
		} else {
			if(nameUsed.indexOf(name) == -1) {
				var previousName = nickNames[socket.id]
				var previousNameIndex = nameUsed.indexOf(previousName) 
				nameUsed.push(name)
				nickNames[socket.id] = name
				delete nameUsed[previousNameIndex]
				socket.emit('nameResult', {
					success : true,
					name : name
				})
				socket.broadcast.to(currentRoom(socket.id)).emit('message', {
					text : previousName + ' is now known as ' + name + '.'
				})
			} else {
				socket.emit('nameResult', {
					success : false,
					message : 'That name is already in use.'
				})
			}
		}
	})	
}

function handleMessageBroadcasting(socket, nickNames) {
	socket.on('message', function(message) {
		socket.broadcast.to(message.room).emit('message', {
			test : nickNames[socket.id] + ': ' + message.text
		})
	})
}

function handleRoomJoining(socket) {
	socket.on('join', function(room) {
		socket.leave(currentRoom[socket.id])
		joinRoom(socket, room.newRoom)
	})
}

function handleClientDisconnection(socket, nickName, namesUsed) {
	socket.on('disconnect', function() {
		var nameIndex = nameUsed.indexOf(nickNames.[socket.id])
		delete nameUsed[nameIndex]
		delete nickNames[socket.id]
	})
}
exports.listen = function(server) {
	io = socket.listen(server)
	io.set('log level', 1)
	io.sockets.on('connection', function(socket) {
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed)
		joinRoom(socket, 'Lobby')
		handleMessageBroadcasting(socket, nickNames)
		handleNameChangeAttempts(socket, nickNames, namesUsed)
		handleRoomJoining(socket)

		socket.on('rooms', function() {
			socket.emit('rooms', io.socket.manager.rooms)
		})

		handleClientDisconnection(socket, nickName, namesUsed)
	})
}