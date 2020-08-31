let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');


const Max_Speed = 30;
const Max_Jump_Height = -300;
const Floor_Height = 5;

let Game_On = false;
let Gravity = 1.5;
let Level = {
   speed: 5,
   min_time_gap: 120
};
let jump = 37;
let distance;
let timeCount = 0
let Score = 0;



class sprite {
   constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = 0;
      this.dy = 0;
      this.radius = radius;
      this.color = color;
   }

   update = function() {
      document.addEventListener("keydown", (e) =>{
         if(e.code === "ArrowUp") {
            if( this.y > 450){
               this.dy = -jump;
            }
         }
      });

      this.y += this.dy;
      Score +=1;
      if(Score % 1000 === 0){
         Level.speed *= 1.2;
         Level.min_time_gap -= 10;
         console.log("level up!");
      }

      if (this.dy <= Max_Speed){
         this.dy += Gravity;
      }
      if (this.y + this.radius >= canvas.height - Floor_Height){
         this.dy = 0;
         this.y = canvas.height - this.radius - Floor_Height;
      }
      this.draw();
   }

   draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      ctx.font = "30px Arial";
      ctx.fillText("Score: "+Score, canvas.width/2 - 65, canvas.height/4);
   }
   coordinates = function() {
      return [this.x, this.y, this.radius];
   }
}

class block {
   constructor(width, height, speed) {
      this.width = width;
      this.height = height;
      this.x = canvas.width + this.width;
      this.y = canvas.height - this.height / 2;
      this.dx = -speed;
   }
   update = function() {
      this.x += this.dx;
      this.draw();
   }
   draw = function() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
   }
   coordinates = function() {
      return [this.x, this.y, this.width, this.height];
   }
}

// blocks[0] = new block(75, Math.floor(Math.random()*51+150), 5)

function animate(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = "black";
   ctx.fillRect(0,0,canvas.width, canvas.height);
   circle.update();
   blocker.update();
   timeCount++;
   if(timeCount >= Math.random() * 51 + Level.min_time_gap){
      blocker = new block(80, Math.floor(Math.random()*101+150), Level.speed);
      timeCount = 0;
   }
   if(!collisionChecker(circle.coordinates(), blocker.coordinates())){
      window.requestAnimationFrame(animate);
   }
}

function collisionChecker(cir, rec){
   let qRad = cir[2] / 2;
   //check top
   if(cir[1] + cir[2] > rec[1] && rec[0] < cir[0] + cir[2] && rec[0] + rec[2] > cir[0] - cir[2] + 5) {
      return true;
   }
   return false;
}
let blocker;
let circle;
function init() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = "black";
   ctx.fillRect(0,0,canvas.width, canvas.height);
   blocker = new block(80, Math.floor(Math.random()*101+150), Level.speed);
   circle = new sprite(canvas.width/3.5, canvas.height/2, 40, "white");
   circle.update();
   blocker.update();
}





function menu(){

      document.addEventListener("keydown", function(e){
         if(e.code === "ArrowUp" && Score < 2) {
            Game_On = true;
            let game = window.requestAnimationFrame(animate);
            animate()
         }
      });
      if(Game_On){
         ;
         window.cancelAnimationFrame(game);
         init();
         Game_On = false;
      }

}
init();
menu();
