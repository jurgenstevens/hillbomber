console.log('This is Hillbomber');

// class Skater {
// 	constructor(name) {
// 		this.name = name;
// 		this.speed = null;
// 		this.wobble = null;
// 	}
// }


// const hillBomber = {

//time: 0

//startTimer() {
// const hillBomberTimer = setInterval(() => {
//	this.time++
// 	this.printStats();
//	if (this.score >= 10){
//		$('#score').attr()
//	}
// }, 1000);
//},


// function gameOver(){
// 	const modal = document.getElementById("myModal");
// 	const span = document.getElementsByClassName("close")[0];
// 	modal.style.display = "block";
// }

// printStats() {
// 		const $timer = $('#timer');
// 		const $score = $('#score');
// 		$timer.text(`TIMER: ${this.time}s`)
// 		$score.text(`AGE: ${Math.floor(this.score)}`)
// 	},

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}



const skateboard = {
	x: 175,
	y: 800,
	height: 70,
	width: 25,
	color: "black",
	speed: 3,

	direction: {
		up: false,
		right: false,
		down: false,
		left: false
	},

	draw() {
		ctx.beginPath()
		ctx.rect(this.x, this.y, this.width, this.height)
		ctx.fillStyle = this.color;
		ctx.fill();	
	},

	setDirection(key) {
		if(key == "w") this.direction.up = true;
		if(key == "a") this.direction.left = true;
		if(key == "s") this.direction.down = true;
		if(key == "d") this.direction.right = true;
	},

	unsetDirection(key) {
		if(key == "w") this.direction.up = false;
		if(key == "a") this.direction.left = false;
		if(key == "s") this.direction.down = false;
		if(key == "d") this.direction.right = false;
	},

	move() {
		if(this.direction.up) {
			this.y -= this.speed;
			if(this.y <= 500 + this.height){
				this.y = 500 + this.height
			}
		}
		if(this.direction.left) {
			this.x -= this.speed;
			if(this.x + this.width <= this.width){
				this.x += 2
			}
		}
		if(this.direction.down) {
			this.y += this.speed;
			if((this.y + this.height) >= canvas.height){
				this.y = canvas.height - this.height
			}
		}
		if(this.direction.right) {
			this.x += this.speed;
			if((this.x + this.width) >= canvas.width){
				this.x = canvas.width - this.width
			}	
		}
	},
	checkCollision(thing) {
		if(this.x + this.width > thing.x &&
	      this.x < thing.x + thing.width &&
	      thing.y < this.y + this.height && 
	      thing.y + thing.height > this.y
		)
		{
			console.log("Wipeout!");
			return true
		}
		else return false
	}
}

const obstacleCar = {
	x: (Math.random() * 250),
	y: 0,
	width: 50,
	height: 100,
	color: "red",
	speed: 10,
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
	    ctx.rect(this.x, this.y, this.width, this.height);
	    ctx.fill();   
	    
	},
	move() {

		this.y += this.speed;
    	if(this.y === 1000){
    		this.y = 0
    		this.x = (Math.random() * 250);
    	}
  	}
}

const obstacleDog = {
	x: (Math.random() * 300),
	y: 0,
	width: 50,
	height: 50,
	color: "black",
	speed: 8,
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
	    ctx.rect(this.x, this.y, this.width, this.height);
	    ctx.fill();
	},
	move() {

		this.y += this.speed;
    	if(this.y === 1000){
    		this.y = 0
    		this.x = (Math.random() * 300);
    	}
  	}
}

const streetLane = {
	x: 165,
	y: 0,
	width: 20,
	height: 100,
	color: "white",
	speed: 10,

	draw() {
		for(let i = 0; i <= canvas.height; i += 50){
		ctx.beginPath();
		ctx.fillStyle = this.color;
	    ctx.rect(this.x, this.y, this.width, this.height);
	    ctx.fill();   
	   }
	},
	move() {

		this.y += (this.speed * 5);
    	if(this.y === 1000){
    		this.y = 0
    		this.x = 155;
    	}
  	}
}
//}


// CREATE ANIMATIONS
let requestID;
let animationRunning = false;
let x = 0;

function animate() { 
	
	animationRunning = true

	// console.log(++x);
	clearCanvas(); // prevents trailers
	streetLane.draw();
	streetLane.move();
	obstacleDog.draw();
	obstacleDog.move();
	obstacleCar.draw();
	obstacleCar.move();
	skateboard.move();
	skateboard.draw();
	
	if(skateboard.checkCollision(obstacleCar)){
		gameOver();
		return;
	} 
	if(skateboard.checkCollision(obstacleDog)){
		gameOver();
		return;
	}
	else {
	// recursion - you are creating a situation where the function calls itself
		requestID = window.requestAnimationFrame(animate)
	}
}
animate();

function gameOver(){
	const modal = document.getElementById("myModal");
	const span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";
}



// Listeners

//start game
// $('.#startButton').on('click', () => {
	// hide the start section
	// $('.startSection').hide();
	// invoke the start timer function

	// everything that isnt in the startSection section, should
	// be hidden until the start button has been clicked

	// and show the actual game play	
// })


document.addEventListener('keyup', (e) => {
	// for skateboard
	if(["w", "a", "s", "d"].includes(e.key)){
		skateboard.unsetDirection(e.key)
	}
});

document.addEventListener('keydown', (e) => {
	
	skateboard.setDirection(e.key)
	
});









