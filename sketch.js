let size = 40;
let canvasX=1500, canvasY=900;
let tilesX,tilesY;
var tilesArr = [];
let bombpercent = 0.15;
let gamestate = "ingame";
let bombCount = 0;
let correctMarkedBombs = 0;

function setup() {
	createCanvas(canvasX, canvasY);
	tilesX = canvasX/size; tilesY=canvasY/size;
	makeTiles();

}

function draw() {
	background(220);
	tilesX = canvasX/size; tilesY=canvasY/size;

	for (var i = 0; i < tilesArr.length; i++) {
		tilesArr[i].show();
	}
	drawGrid();
	GameState();
}

function drawGrid() {
	stroke(20);
	strokeWeight(1);

	for (var i = 0; i < tilesX; i++) {
		for (var j = 0; j < tilesY; j++) {
			line(i*size, 0, i*size, canvasY);
			line(0, j*size, canvasX, j*size);
		}
	}

	stroke(20);
	strokeWeight(3);
	fill(240);
	textSize(50);
	textAlign(RIGHT, BOTTOM);
	text(bombCount, canvasX/2, canvasY/2, canvasX, canvasY);

}

function makeTiles(){
	tilesArr= [];
	for (var i = 0; i < tilesX; i++) {
		for (var j = 0; j < tilesY; j++) {
			let bomb = false;
			if(random(1)<bombpercent){
				bombCount++;
				bomb = true;
			}

			var temp = new tile(i*size, j*size, size, bomb);
			tilesArr.push(temp);
		}
	}

	for (var i = 0; i < tilesArr.length; i++) {
		tilesArr[i].setitup();
	}
}

function mousePressed(){
	if(gamestate == "ingame"){
		for (var i = 0; i < tilesArr.length; i++) {
			if(mouseButton === LEFT) {
				tilesArr[i].clicked();
			}
			else if(mouseButton === RIGHT) {
				tilesArr[i].mark();
			}
		}
	}
}
function GameState(){
	if(correctMarkedBombs == bombCount){
		gamestate = "won";
	}

	switch(gamestate){
		case "lost":
			noStroke();
			fill(200,100,100);
			textSize(200);
			textAlign(CENTER, CENTER);
			text("LOST", canvasX/2, canvasY/2, canvasX, canvasY);
			for (var i = 0; i < tilesArr.length; i++) {
				if(tilesArr[i].state == "bomb"){
					tilesArr[i].visible = true;
				}
			}
			break;
		case "won":
			noStroke();
			fill(100,200,100);
			textSize(200);
			textAlign(CENTER, CENTER);
			text("WON", canvasX/2, canvasY/2, canvasX, canvasY);
		break;
		default:
			break;
	}
}
