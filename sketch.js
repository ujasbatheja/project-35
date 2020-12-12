var dog,dogImage;
var database, position;

function preload(){     
  dogImage = loadImage("images/dogimg1.png");
}

function setup() {
  createCanvas(500,500);
  dog = createSprite(250,250,5,5);
  dog.scale = 0.3;
  database = firebase.database();
  position = database.ref("dog/pos");
  position.on("value",readPosition,showError);
  console.log(database);
  
}


function draw() {  
  background("white");
  if(keyDown(LEFT_ARROW)){
      changePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
      changePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
      changePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
      changePosition(0,+1);
  }
   dog.addImage("dogImage",dogImage);

  drawSprites();
}

function changePosition(ofsetx,ofsety){
  database.ref("dog/pos").set(
      {
          x:dog.x + ofsetx, 
          y:dog.y + ofsety,
      }
  )
}

function readPosition(data){
  var dogPosition = data.val();
  dog.x = dogPosition.x;
  dog.y = dogPosition.y;
  console.log("readPosition" + dogPosition);
}
function showError(){
  console.log("database readError");
}