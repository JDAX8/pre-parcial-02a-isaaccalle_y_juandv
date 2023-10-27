class Duck{
    constructor(x, y, type){
        this.x=x;
        this.y=y;
        this.type=type;
        this.speed=2;
        this.movingRight= true;
    }
}

show(){
    imageMode(CENTER);
    switch(this.type){
        case 0:
            image(normalDuckImage, this.x, this.y, 64, 64)
        break;

        case 1:
            image(fastDuckImage, this.x, this.y, 64, 64)
        break;
    }
    imageMode(CORNER);
}

move(){
    this.x += this.type == 0 ? this.speed : this.speed*3;
    if(this.x > 450){
        this.x = -50;
        if(this.type == 1){
            this.y = random(0, 400);
        }
    }
}

let img;

function before() {
    normalDuckImage = loadImage("images/normal duck.png");
    fastDuckImage = loadImage("images/pink duck.png");
}