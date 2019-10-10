console.log('This is Hillbomber');


// show the start button page
// meanwhile the actual game is hidden

// START BUTTON



const hillBomber = {

	time: 0,
	score: 0,

	// START BUTTON
	gameStart(){
		const modal = document.getElementById("startModal");
		modal.style.display = "none";

		this.startTimer();
		this.startCanvas();
	},

	startTimer() {
		const intervalId = setInterval(() => {
			this.time++
			this.score += .9;
			this.printStats();
			if (this.score >= 10){
				console.log('Game won');
				clearInterval(intervalId);
				console.log('Interval ID cleared');
				this.gameWon();
				clearCanvas();
				console.log('Canvas cleared..?');
			} 
			if (skateboard.checkCollision(obstacleCar)){
				this.gameOver();
				clearInterval(intervalId);
				clearCanvas();
			}
			if (skateboard.checkCollision(obstacleDog)){
				this.gameOver();
				clearInterval(intervalId);
				clearCanvas();
			}
			if (skateboard.checkCollision(obstaclePotHole)){
				this.gameOver();
				clearInterval(intervalId);
				clearCanvas();
			}
		}, 1000);
		// this.time = intervalId;
	},


	printStats() {
		const $timer = $('#timer');
		const $score = $('#score');
		$timer.text(`TIMER: ${this.time}s`)
		$score.text(`SCORE: ${Math.floor(this.score)}`)
	},


	startCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		animate();
	},
		

	gameWon() {
		// console.log('Game Won!');
		const modal = document.getElementById("myModalWin");
		const span = document.getElementsByClassName("close")[0];
		modal.style.display = "block";
	},

	gameOver() {
		const modal = document.getElementById("myModalLose");
		const span = document.getElementsByClassName("close")[0];
		modal.style.display = "block";
	}
};




// THE ACTUAL CANVAS
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}


// SKATEBOARD WITHIN THE CANVAS
const skateboard = {
	x: 175,
	y: 800,
	height: 70,
	width: 25,
	color: "black",
	speed: 5,

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
				this.x += 10
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


// CAR WITHIN THE CANVAS
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

// DOG WITHIN THE CANVAS
const obstacleDog = {
	x: (Math.random() * 300),
	y: 0,
	width: 50,
	height: 50,
	color: "black",
	speed: 5,
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

// POTHOLE WITHIN THE CANVAS
const obstaclePotHole = {
	x: (Math.random() * 300),
	y: 0,
	width: 40,
	height: 40,
	color: "brown",
	speed: 5,
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

// STREET LANE WITHIN THE CANVAS
const streetLane = {
	x: 165,
	y: 0,
	width: 20,
	height: 100,
	color: "white",
	speed: 25,

	draw() {
		for(let i = 0; i <= canvas.height; i += 20){
		ctx.beginPath();
		ctx.fillStyle = this.color;
	    ctx.rect(this.x, this.y, this.width, this.height);
	    ctx.fill();   
	   }
	},
	move() {

		this.y += this.speed;
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
	obstaclePotHole.draw();
	obstaclePotHole.move();
	streetLane.draw();
	streetLane.move();
	obstacleDog.draw();
	obstacleDog.move();
	obstacleCar.draw();
	obstacleCar.move();
	skateboard.move();
	skateboard.draw();


	// if(hillBomber.score >= 10){
	// 	// let requestID = false;
	// 	animationRunning = null;
	// 	x = null;
	// 	clearCanvas();
	// 	hillBomber.gameWon();
	// 	// clearCanvas();
	// 	// let requestID = false;
	// 	// let x = null;
	// 	// let animationRunning = false;
	// }
	// USE THIS FOR FUTURE REFERENCE
	if(skateboard.checkCollision(obstacleCar) || skateboard.checkCollision(obstacleDog) || skateboard.checkCollision(obstaclePotHole)){
		hillBomber.gameOver();
		clearCanvas();
		return;
	} else if (hillBomber.score >= 10) {
		clearCanvas();
		hillBomber.gameWon();
	} else {
	// recursion - you are creating a situation where the function calls itself
		requestID = window.requestAnimationFrame(animate)
	}

}


// Listeners

// start game
$('#startButton').on('click', () => {
	// hide the start section
	$('.startSection').hide();
	// invoke the start timer function
	hillBomber.gameStart();
	// everything that isnt in the startSection section, should
	// be hidden until the start button has been clicked
	// and show the actual game play	
})

document.addEventListener('keyup', (e) => {
	// for skateboard
	if(["w", "a", "s", "d"].includes(e.key)){
		skateboard.unsetDirection(e.key)
	}
});

document.addEventListener('keydown', (e) => {
	skateboard.setDirection(e.key)
	
});










