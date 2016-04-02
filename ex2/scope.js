var pet = {
	name:'ctyloading',
	changeName:function(name){
		this.name = name;
	},
	speak:function(action){
		console.log(action + this.name);
	}
}

var dog = {
	name: 'xiaohuzi'
}

pet.changeName('aciaciaica')
pet.speak('say')

pet.speak.call(dog,'say')

