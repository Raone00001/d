var dog, happyDog, dIMG, hpIMG;
var database;
var foodS;

function preload(){

  dIMG = loadImage("images/dogImg.png");
  hpIMG = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(250,250,30,30);
  dog.addImage(dIMG);
  dog.scale = 0.2;

  var foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);
  
}


function draw() {  
  background(rgb(46, 139, 87));

    if(keyWentDown(UP_ARROW)){

      writeStock(foodS);
      dog.addImage(hpIMG);

    }

  drawSprites();
 
    fill("white");
    stroke("black");
    textSize(10);
    text("Food Remaining: " + foodS, 195, 150);
    text("Note: Press The Up Arrow Key To Feed The Dog Milk!", 140, 10);

}

function readStock(data){

  foodS = data.val();

}

function writeStock(x){

  if(x <= 0){

    x = 0;

  } else {

    x = x-1;

  }

  database.ref('/').update({

    Food: x

  })

}

function showError(){

  console.log("Not Working");

}