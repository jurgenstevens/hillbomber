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

	// starts the timer and also allows the score to go up in adjustable increments
	startTimer() {
		const intervalId = setInterval(() => {
			this.time++
			this.score += .4;
			this.printStats();
			if (this.score >= 10){
				clearInterval(intervalId);
				this.gameWon();
				clearCanvas();
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
	},

	// shows the timer and score on the game
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

// will clear the trail left by the objects within the canvas after moving
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const skateboardImg = document.getElementById("theSkateboard");
const carImg = document.getElementById("obstacleCar");
const dogImg = document.getElementById("obstacleDog");
const potHoleImg = document.getElementById("obstaclePotHole");



// SKATEBOARD WITHIN THE CANVAS
const skateboard = {
	x: 175,
	y: 800,
	height: 85,
	width: 35,
	color: "black",
	speed: 4,

	direction: {
		up: false,
		right: false,
		down: false,
		left: false
	},

	draw() {
		ctx.drawImage(skateboardImg, this.x, this.y, this.width, this.height);
		// ctx.beginPath()
		// ctx.rect(this.x, this.y, this.width, this.height)
		// ctx.fillStyle = this.color;
		// ctx.fill();	
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

	// let's the game know if the main object touches any incoming obstacle, the game is over
	checkCollision(thing) {
		if(this.x + this.width > thing.x &&
	      this.x < thing.x + thing.width &&
	      thing.y < this.y + this.height && 
	      thing.y + thing.height > this.y
		)
		{	
			return true
		} else 
			return false
	}
}


// CAR WITHIN THE CANVAS
const obstacleCar = {
	x: (Math.random() * 250),
	y: 0,
	width: 70,
	height: 140,
	color: "red",
	speed: 10,
	draw() {
		ctx.drawImage(carImg, this.x, this.y, this.width, this.height);
		// ctx.beginPath();
		// ctx.fillStyle = this.color;
		// ctx.rect(this.x, this.y, this.width, this.height);
		// ctx.fill();
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
	x: (Math.random() * 350),
	y: 0,
	width: 60,
	height: 60,
	color: "black",
	speed: 5,
	draw() {
		ctx.drawImage(dogImg, this.x, this.y, this.width, this.height);
		// ctx.beginPath();
		// ctx.fillStyle = this.color;
		// ctx.rect(this.x, this.y, this.width, this.height);
		// ctx.fill();
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
	width: 50,
	height: 50,
	color: "brown",
	speed: 5,
	draw() {
		ctx.drawImage(potHoleImg, this.x, this.y, this.width, this.height);
		// ctx.beginPath();
		// ctx.fillStyle = this.color;
		// ctx.rect(this.x, this.y, this.width, this.height);
		// ctx.fill();
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

	clearCanvas(); // prevents trailers for the following objects
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

	// USE THIS FOR FUTURE REFERENCE
	// causes the animation to stop whether the skateboarder collided with an obstacle or has reached the goal of x amount
	// of points on the score
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

// starts the game
$('#startButton').on('click', () => {
	// hide the start section
	$('.start-modal').hide();
	// invoke the start timer function
	hillBomber.gameStart();
	// everything that isnt in the startSection section, should
	// be hidden until the start button has been clicked
	// and show the actual game play	
})

// allows the w, a, s, d keys to be the way to move the skateboarder
document.addEventListener('keyup', (e) => {
	// for skateboard
	if(["w", "a", "s", "d"].includes(e.key)){
		skateboard.unsetDirection(e.key)
	}
});
document.addEventListener('keydown', (e) => {
	skateboard.setDirection(e.key)
});









