function getRandomBetween(min, max){
    return min + Math.floor(Math.random() * (max - min));
}

function notice(){
    var counter = 0;
    var move = 0;
    var array = ['css/b1.png','css/b2.png','css/b3.png'];
    var bird = document.getElementById('bird');
    var forBird = document.getElementById('forBird');
    var words = document.getElementById('words');

    var timer = setInterval(function(){
      counter++;
      if (counter > 2) counter = 0;
      if(move < 100) move+=20;
      if(move == 100) move+=0;

      bird.src = array[counter];
      forBird.style.left = move + 'px';
      words.style.left = move + 'px';
    }, 100);

    setTimeout(function(){
      words.style.display = 'none';
      forBird.style.display = 'none';
      clearInterval(timer);
    }, 4000);
}
notice();

var Boat=function(){
    this.sprite='images/boat.png';
    this.x=0;
    this.y=50;
    this.speed=50;
};

Boat.prototype.update=function(dt){
  if(this.x >= 83 * 5) {
    this.speed = -(this.speed);
  }
  if(this.x <= 0) {
    this.speed = -(this.speed);
  }
  this.x+= this.speed*dt;

  if(Math.abs(this.x - key.x) < 40 && Math.abs(this.y - key.y) < 40){
    player.y = 0;
    key.y = 0;
    this.speed = 0;
    var cel = document.getElementById("celebration");
    cel.style.display = 'block';
    setTimeout(function(){
        cel.style.display = 'none';
        location.reload();
     },4000);
    }
};

Boat.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Mutant=function(){
    this.sprite = 'images/mutant.png';
    this.x = getRandomBetween(0,404);
    this.y = 50;
    this.speed = 80;
};

Mutant.prototype.update = function(dt) {
    this.y+= this.speed*dt;
    if(this.y > (606-60)){
        this.x = getRandomBetween(0,404);
        this.y = 50;
    }

    if(Math.abs(this.x - player.x) < 20 && Math.abs(this.y-player.y) < 10){
        player.x = 202;
        player.y = 415;
        player.score-= 30;
    }
};

Mutant.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Zombie=function(){
    this.sprite = 'images/zombie.png';
    this.x = -101;
    this.y = getRandomBetween(83,249);
    this.speed = getRandomBetween(100,200);
};

Zombie.prototype.update = function(dt) {
    this.x+= this.speed*dt;
    if(this.x > 600){
        this.x = -101;
        this.y=getRandomBetween(83,249);
    }

    if(Math.abs(this.x - player.x) < 70 && Math.abs(this.y - player.y) < 60){
        player.x = 202;
        player.y = 415;
        player.score-= 20;
    }
};

Zombie.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x =-101;
    this.y = getRandomBetween(83,249);
    this.speed = getRandomBetween(150,250);
};

Enemy.prototype.update = function(dt) {
    this.x+= this.speed*dt;
    if(this.x > 600){
        this.x= -101;
        this.y=getRandomBetween(83,249);
    }

    if(Math.abs(this.x-player.x) < 70 && Math.abs(this.y - player.y) < 60){
        player.x = 202;
        player.y = 415;
        player.score-= 10;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var orangeGem = function(){
    this.sprite = 'images/Gem-Orange.png';
    this.x = getRandomBetween(0,83 * 4);
    this.y = 95;
};

orangeGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var greenGem = function(){
    this.sprite = 'images/Gem-Green.png';
    this.x = getRandomBetween(0,83 * 4);
    this.y = 240;
};

greenGem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Star = function(){
    this.sprite = 'images/Star.png';
    this.x = getRandomBetween(0,83 * 4);
    this.y = 240;
};

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Key = function(){
    this.sprite = 'images/Key.png';
    this.x = getRandomBetween(0,83 * 4);
    this.y = 190;
};

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = ['images/char-boy.png','images/char-cat-girl.png','images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];
    this.x = 202;
    this.y = 415;
    this.speed = 30;
    this.score = 0;
    this.counter = 0;
    this.timesOrange = 0;
    this.timesGreen = 0;
    this.timesStar = 0;
};

Player.prototype.update = function(dt){
    window.onkeyup = function(e){
       if(e.keyCode === 13){
         player.counter++;
         if(player.counter >= player.sprite.length){
            player.counter = 0;
         }
       }
    };
    if(this.x > 400){
        this.x = 400;
    }
    if(this.x < 0){
        this.x = 0;
    }
    if(this.y > 420){
        this.y = 420;
    }
    if(this.y < 0){
        this.y = 0;
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite[this.counter]), this.x, this.y);
};

Player.prototype.handleInput = function(direction){
    switch(direction){
        case 'left':
            this.x-= this.speed;
            break;
        case 'up':
            this.y-= this.speed;
            break;
        case 'right':
            this.x+= this.speed;
            break;
        case 'down':
            this.y+= this.speed;
            break;
    }
};

Player.prototype.scoring = function(){
    if(Math.abs(orange.x - player.x) < 40 && Math.abs(orange.y - player.y) < 40){
        orange.sprite = 'images/Rock.png';
        this.timesOrange++;
        if(player.timesOrange > 1){return;}
        this.score+= 5;
    }
    if(Math.abs(green.x - player.x) < 40 && Math.abs(green.y - player.y) < 40){
        green.sprite = 'images/Rock.png';
        this.timesGreen++;
        if(player.timesGreen > 1){return;}
        this.score+= 10;
    }
    if(Math.abs(star.x - player.x)< 40 && Math.abs(star.y - player.y) < 40 ){
        star.sprite = 'images/Rock.png';
        this.timesStar++;
        if(player.timesStar > 1){return;}
        this.score+= 1;
    }
    if(Math.abs(key.x - player.x) < 40 && Math.abs(key.y - player.y) < 40 ){
         key.x = player.x;
         key.y = player.y;
    }
};

var allEnemies = [];
 while(allEnemies.length < 3) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
  }
var zombie = new Zombie();
var mutant = new Mutant();
var orange = new orangeGem();
var green = new greenGem();
var star = new Star();
var player = new Player();
var boat = new Boat();
var key = new Key();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };
    player.handleInput(allowedKeys[e.keyCode]);
});


