let x, y, s;
let blankCol =  150;
let state;
let neighbors = [];
let dirNeighbors = [];
let counter;
let dirCounter;
let distance;
let nearbyNumber = 0;
let visible = false;
let marked = false;

class tile {
  constructor(xpos, ypos, size, bomb){
    this.x = xpos+size/2;
    this.y= ypos+size/2;
    this.s = size;
    this.bomb = bomb;

    if(bomb){
      this.state = "bomb";
    }
    else {
      this.state = "blank"
    }



  }

  setitup(){
    ellipseMode(CENTER);
    this.neighbors = [8];
    this.dirNeighbors = [4];
    this.getNeighbors();
  }

  show(){
    noStroke();
    rectMode(CENTER);
    this.getNeighborsState();

  if(!this.visible){
    if(this.marked){
      this.visMarked();
    }
    else {
      this.visInvis();
    }
  }
  else{
    switch (this.state) {
      case "bomb":
        this.visBomb();
        break;
      case "blank":
        this.visBlank();
        break;
      case "nextTo":
        this.visNextTo();
        break;
      default:
        this.visBlank();
        break;
      }
    }
  }

  clicked(){
    if(mouseX > this.x-this.s/2 && mouseX < this.x+this.s/2){
      if(mouseY > this.y-this.s/2 && mouseY < this.y+this.s/2){
        this.clickThisTile();
      }
    }
  }
  mark(){
    if(mouseX > this.x-this.s/2 && mouseX < this.x+this.s/2){
      if(mouseY > this.y-this.s/2 && mouseY < this.y+this.s/2){
        this.marked = !this.marked;
        if(this.marked && this.bomb){
          correctMarkedBombs++;
        }
        else if(!this.marked && this.bomb){
          correctMarkedBombs--;
        }
      }
    }
  }

  clickThisTile(){
    if(this.state == "bomb"){
      this.visible = true;
      gamestate = "lost";
    }
    else if(this.state == "nextTo"){
      this.visible = true;
    }
    else {
    this.setTileVisible();
    }
  }

  setTileVisible(){

    this.visible = true;
    for (var i = 0; i < this.dirNeighbors.length; i++) {
      if(this.dirNeighbors[i].state == "blank"&&!this.dirNeighbors[i].visible){
        this.dirNeighbors[i].setTileVisible();
      }
    }

    for (var i = 0; i < this.neighbors.length; i++) {
      if(this.neighbors[i].state == "nextTo"&&!this.neighbors[i].visible){
        this.neighbors[i].visible = true;
      }
    }
  }


  getNeighbors(){
    this.counter = 0;
    for (var i = 0; i < tilesArr.length; i++) {
      if(dist(this.x, this.y, tilesArr[i].x, tilesArr[i].y) <= (1.42*this.s)){
        if(tilesArr[i]!= this){
          this.neighbors[this.counter] = tilesArr[i];
          this.counter++;
        }
      }
    }
    this.dirCounter = 0;
    for (var i = 0; i < this.neighbors.length; i++) {
      if(dist(this.x, this.y, this.neighbors[i].x, this.neighbors[i].y) <= this.s){
          this.dirNeighbors[this.dirCounter] = this.neighbors[i];
          this.dirCounter++;
      }
    }
  }



  getNeighborsState(){
    this.nearbyNumber = 0;
    if(this.state != "bomb"){
      for (var i = 0; i < this.neighbors.length; i++) {
        if(this.neighbors[i].state == "bomb"){
          this.nearbyNumber+=1;
          this.state = "nextTo";
        }
      }
    }
  }

//Visuals
  visBomb(){
    this.visInvis();
    fill(10,10,10);
    ellipse(this.x, this.y, this.s*0.6,);
  }
  visInvis(){
    fill(150);
    rect(this.x,this.y, this.s, this.s);
  }
  visBlank(){
    fill(100);
    rect(this.x,this.y, this.s, this.s);
  }
  visNextTo(){
    fill(200);
    rect(this.x,this.y, this.s, this.s);
    fill(200,100,100);
    textAlign(CENTER, CENTER);
    textSize(this.s/2);
    text(this.nearbyNumber, this.x+this.s/20, this.y+this.s/15, this.s, this.s);
  }
  visMarked(){
    this.visInvis();
    fill(200,100,100);
    ellipse(this.x, this.y, this.s*0.6,);
  }
}
