
let ducks;
let points = 0;
let posx = 600;
let posy = 400;
let speed = 10;

let xcanvas = 1200;
let ycanvas = 800;

function preload() {
    backgroundi = loadImage('./images/fondo.png');
    sight = loadImage('./images/sight.png');
    win = loadImage('./images/dog smiling.gif');
}

function setup(){
    createCanvas(xcanvas, ycanvas);
    ducks = new Duck();
}

function draw() {
    background(backgroundi);
    noStroke();

    //DUCK
    if(points < 1000){
        ducks.show();
        ducks.move();
    }


    //POINT
    textSize(25);
    fill(0);
    text("Points: " + points, 20,40);

    //sight
    //image(sight, mouseX-25 , mouseY-25 , 50, 50);
    if(points < 1000){
    image(sight, posx, posy, 50, 50);
    keyPress();
    shoot();
    }

    //WIN
    if(points >= 1000){
        textSize(200);
        fill(0);
        text("YOU WIN", 150, 400);
        image(win, xcanvas/2, 480, 100, 100);
    }
}

function keyPress() {
    if (keyIsDown(RIGHT_ARROW)) {
        posx += speed; 
    }
    if (keyIsDown(LEFT_ARROW)) {
        posx -= speed; 
    }
    if (keyIsDown(DOWN_ARROW)) {
        posy += speed; 
    }
    if (keyIsDown(UP_ARROW)) {
        posy -= speed; 
    }
}

function shoot(){
    if(keyIsDown(32)){
        if (posx > ducks.x &&
            posx < ducks.x + 80 &&
            posy > ducks.y &&
            posy < ducks.y + 80) {
                if(ducks.type === 1){
                    points += 100;
                }
                else if(ducks.type === 0){
                    points += 50;
                }
            reset();
          }
    }
    
}

function reset(){
    ducks = new Duck();
}

class Duck{
    constructor(){
        this.x=500;
        this.y=400;
        this.type=Math.round(Math.random());
        if(this.type === 1){
            this.speedx=6;
            this.speedy=6;
        }
        else{
            this.speedx=4;
            this.speedy=4;
        }
        this.normalDuckImage = loadImage('./images/normal duck.png');
        this.fastDuckImage = loadImage('./images/pink duck.png');
        this.shooted = loadImage('./images/shooted.png')
    }

show(){
    switch(this.type){
        case 0:
            noStroke();
            fill(255, 0, 0)
            image(this.normalDuckImage, this.x, this.y, 80, 80);
 
        break;

        case 1:
            noStroke();
            fill(255, 0, 0)
            image(this.fastDuckImage, this.x, this.y, 80, 80);
            
        break;
    }
}

move(){
    this.x = this.x + this.speedx;
    this.y = this.y - this.speedy;

    if (this.x  > 1200) {
        this.speedx = -this.speedx;
    }

    if (this.x < 0) {
        this.speedx = -this.speedx;
    }

    if (this.y > 800) {
        this.speedy = -this.speedy;
    }

    if (this.y < 0) {
        this.speedy = -this.speedy;
    }

}

}