let playerName = prompt("Enter your player name");
let animationID = "";
let begginingBubblesArray = [];
let totalScore = 0;
let numberOfLives = 1;
let intervalId = null;
function statingoff() {
  const beginningCanvas = document.querySelector("#stater-particles-animation");
  const ctxbeginning = beginningCanvas.getContext("2d");
  console.log(beginningCanvas);
  console.log(ctxbeginning);
  beginningCanvas.width = window.innerWidth - 15;
  beginningCanvas.height = window.innerHeight - 15;
  window.addEventListener("resize", function () {
    beginningCanvas.width = window.innerWidth - 10;
    beginningCanvas.height = window.innerHeight - 10;
  });
  const mousebeginning = {
    x: undefined,
    y: undefined,
  };
  beginningCanvas.addEventListener("mousemove", function (event) {
    mousebeginning.x = event.x;
    mousebeginning.y = event.y;
    for (let i = 0; i < 8; i++) {
      begginingBubblesArray.push(new beginningBubbles());
    }
    // console.log("is this thing working")
  });
  beginningCanvas.addEventListener("click", function (event) {
    mousebeginning.x = event.x;
    mousebeginning.y = event.y;
    for (let i = 0; i < 300; i++) {
      begginingBubblesArray.push(new beginningBubbles());
    }
    // console.log("is this thing working")
  });
  class beginningBubbles {
    constructor() {
      this.x = mousebeginning.x;
      this.y = mousebeginning.y;
      // this.x = Math.random() * beginningCanvas.width;
      // this.y = Math.random() * beginningCanvas.height;
      this.vX =
        Math.random() < 0.5
          ? Math.random() * 5 + 1
          : (Math.random() * 5 + 1) * -1;
      this.vY =
        Math.random() < 0.5
          ? Math.random() * 5 + 1
          : (Math.random() * 5 + 1) * -1;
      this.size = Math.floor(Math.random() * 15 + 10);
    }
    update() {
      this.x += this.vX;
      this.y += this.vY;
      if (this.size > 1) {
        this.size -= 0.2;
      }
    }
    draw() {
      // ctxbeginning.fillStyle = 'rgba(0, 161, 185, 0.35)'
      // ctxbeginning.fillStyle = "rgba(120,180,225,0.8";
      ctxbeginning.fillStyle = "rgba(225,225,225,0.5";
      ctxbeginning.beginPath();
      ctxbeginning.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctxbeginning.fill();
    }
  }
  function drawingthebubbles() {
    for (let i = 0; i < begginingBubblesArray.length; i++) {
      begginingBubblesArray[i].update();
      begginingBubblesArray[i].draw();
      // console.log(begginingBubblesArray[i].size)
    }
  }
  function removingIssues() {
    for (let i = 0; i < begginingBubblesArray.length; i++) {
      if (begginingBubblesArray[i].size <= 1) {
        begginingBubblesArray.splice(i, 1);
        console.log(begginingBubblesArray.length);
        i--;
      }
      // if (begginingBubblesArray[i].x < 0 || begginingBubblesArray[i].x > beginningCanvas.width) {
      //   begginingBubblesArray.splice(i, 1);
      //   // console.log(begginingBubblesArray.length)
      //   i--;
      // }
      // if (begginingBubblesArray[i].y < 0 || begginingBubblesArray[i].y > beginningCanvas.height) {
      //   begginingBubblesArray.splice(i, 1);
      //   // console.log(begginingBubblesArray.length)
      //   i--;
      // }
    }
  }
  function animate() {
    console.log(
      `Initial animation Frame for particles on 'Bubble Popper' still running, with ${begginingBubblesArray.length} number of particles/bubbles`
    );
    ctxbeginning.clearRect(0, 0, beginningCanvas.width, beginningCanvas.height);
    drawingthebubbles();
    animationID = requestAnimationFrame(animate);
    removingIssues();
  }
  animate();
}
statingoff();
const myGameArea = {
  canvas: document.createElement("canvas"),
  location: document.querySelector(`.outer`),
  bodyLocation: document.querySelector(`body`),
  start: function () {
    this.canvas.width = 1200;
    this.canvas.height = 800;
    this.canvas.className = "indexCanvasOne";
    //   this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.location.className = "hidden";
    this.bodyLocation.className = "start-background";
    // console.log(this.location)
    // console.log(this.canvas)
  },
};
class Blueprint {
  constructor(x, y, width, height, canvasContext) {
    this.x = x;
    this.y = y;
    this.vX = 0;
    this.vY = 0;
    this.width = width;
    this.height = height;
    this.ctx = canvasContext;
    this.crashing = false;
  }
  updatePosition() {
    this.x += this.vX;
    this.y += this.vY;
  }
  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
    // console.log("Checking to see if this works with extened class")
    // it works
  }
  bottom() {
    return this.y + this.height;
  }
  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
  doubleCrashCheck() {
    this.crashing = !this.crashing
  }
}
class ImageObjects extends Blueprint {
  constructor(x, y, width, height, canvasContext, imageElement) {
    super(x, y, width, height, canvasContext);
    this.image = imageElement;
  }
  draw() {
    // console.log(this.ctx)
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  mainCharacterLocationFunction() {
    this.x = mouse.x;
    this.y = mouse.y;
  }
}
class Megladon {
  constructor(ctx, myCanvas, imageMeg) {
    this.x = 0;
    this.width = 300;
    this.height = 200;
    this.vX = 3.3;
    this.vY = 6;
    this.aY = -1;
    this.imageMeg = imageMeg;
    this.rotate1 = -120;
    this.counter = 5;
    this.rotate2 = 22.5;
    this.half = 0.9;
    this.hitboxX = -150;
    this.hitboxVx = 4;
    this.hitboxVy = 6;
    this.hitboxAy = -1;
    this.collision = false
    this.ctx = ctx;
    this.myCanvas = myCanvas
    this.y = this.myCanvas.height;
    this.hitboxY = this.myCanvas.height + 50
  }
  draw0() {
    // ctx.drawImage(this.image, this.x - this.width, this.y + this.height, this.width, this.height)
    this.ctx.strokeRect(this.hitboxX, this.hitboxY, this.width * .9, this.height * .9)
  }
  draw1() {
    this.vY += 0.005
    this.vX += 0.005
    this.ctx.save()
    this.ctx.translate(this.x - 150, this.y + 280)
    this.ctx.rotate(this.rotate1 * Math.PI / 360);
    this.ctx.drawImage(this.imageMeg, 0, 0, this.width, this.height)
    // this.ctx.beginPath();
    // this.ctx.fillRect(0,0,this.width, this.height)
    // this.ctx.stroke;
    this.ctx.restore()
  }
  draw2() {
    this.vY += 0.05
    this.vX += 0.05
    this.aY += 0.006
    this.hitboxAy += 0.015
    this.rotate1 += 2.5
    this.ctx.save()
    this.ctx.translate(this.x - 150, this.y + 280)
    this.ctx.rotate(this.rotate1 * Math.PI / 360);
    this.ctx.drawImage(this.imageMeg, 0, 0, this.width, this.height)
    // this.ctx.beginPath();
    // this.ctx.fillRect(0,0,this.width, this.height)
    // this.ctx.stroke;
    this.ctx.restore()
  }
  draw3() {
    this.vX += 0.05
    this.aY += 0.0155
    this.rotate2 += 0.5
    this.ctx.save()
    this.ctx.translate(this.x - 150, this.y + 280)
    this.ctx.rotate(this.rotate2 * Math.PI / 360);
    this.ctx.drawImage(this.imageMeg, 0, 0, this.width, this.height)
    // this.ctx.beginPath();
    // this.ctx.fillRect(0,0,this.width, this.height)
    // this.ctx.stroke;
    this.ctx.restore()
  }
  update() {
    this.aY += 0.0055
    this.x += this.vX
    this.y += (this.vY * this.aY)
    // console.log(this.y)
    this.hitboxAy += 0.0075
    this.hitboxX += this.hitboxVx
    this.hitboxY += (this.hitboxVy * this.hitboxAy);
  }
  left() {
    return this.hitboxX;
  }
  right() {
    return this.hitboxX + this.width * .9;
  }
  top() {
    return this.hitboxY;
    // console.log("Checking to see if this works with extened class")
    // it works
  }
  bottom() {
    return this.hitboxY + this.height * .9;
  }
  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
  collisionUpdate() {
    this.collision = !this.collision
  }
}
class Shark extends ImageObjects {
  constructor(myCanvas, canvasContext, imageElement) {
    super();
    this.myCanvas = myCanvas;
    this.x = this.myCanvas.width;
    this.topY = Math.random() * (this.myCanvas.height * 0.6 - 100)
    this.bottomY = Math.random() * ((this.myCanvas.height * 0.4 + this.myCanvas.height * 0.6) - 100)
    this.y = Math.random() > 0.15 ? this.topY : this.bottomY;
    this.width = 200;
    this.height = 60;
    this.ctx = canvasContext;
    this.imageElement = imageElement
    this.vX = Math.random() < 0.2 ? 6 : Math.floor(Math.random() * 4) + 2;
    this.accelerationBinary = Math.random() < 0.8 ? true : false;
    this.accelerationX = 1;
    this.sharkBinaryY = Math.random() > 0.5 ? true : false;
    this.vY = 0;
  }
  draw() {
    // console.log(this.ctx)
    this.ctx.drawImage(this.imageElement, this.x, this.y, this.width, this.height);
  }
  changeSharkBinaryY() {
    this.sharkBinaryY = !this.sharkBinaryY;
  }
  checkBinaryY() {
    if (this.sharkBinaryY) {
      this.vY = 1.5;
    } else {
      this.vY = -2;
    }
  }
}
class Turtle extends Blueprint {
  constructor(
    x,
    y,
    width,
    height,
    canvasContext,
    imageElement,
    myCanvas,
    bigTurtleMovementX,
    bigTurtleMovementY,
    bigTurtleMovementBinary
  ) {
    super(x, y, width, height, canvasContext);
    this.image = imageElement;
    this.myCanvas = myCanvas;
    this.bigTurtleMovementX = bigTurtleMovementX;
    this.bigTurtleMovementY = bigTurtleMovementY;
    this.bigTurtleMovementBinary = bigTurtleMovementBinary;
  }
  draw() {
    // console.log(this.ctx)
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  updateTurtle() {
    this.x += this.bigTurtleMovementX;
    this.y += this.bigTurtleMovementY;
    if (this.x > this.myCanvas.width - 60) {
      this.bigTurtleMovementX = -2;
      // console.log("Changing direction to Left!");
    } else if (this.x < -60) {
      this.bigTurtleMovementX = 2;
      // console.log("Changing direction to Right!");
    } else if (this.y > this.myCanvas.height - 30) {
      this.bigTurtleMovementY = -1;
      // console.log("Changing direction to Up!");
    } else if (this.y < -60) {
      this.bigTurtleMovementY = 1;
      // console.log("Changing direction to Down!");
    }
  }
  randomizingTurtle() {
    if (
      !(this.x > this.myCanvas.width - 200) &&
      !(this.x < 200) &&
      !(this.y > this.myCanvas.height - 220) &&
      !(this.y < 200)
    ) {
      if (this.bigTurtleMovementBinary) {
        // console.log(this.bigTurtleMovementBinary)
        let holding = Math.floor(Math.random() * 15);
        if (holding <= 1) {
          if (this.bigTurtleMovementX == 2) {
            this.bigTurtleMovementX = -2;
          } else if (this.bigTurtleMovementX == -2) {
            this.bigTurtleMovementX = 2;
          }
          this.bigTurtleMovementBinary = !this.bigTurtleMovementBinary;
        }
      } else if (!this.bigTurtleMovementBinary) {
        // console.log(this.bigTurtleMovementBinary)
        let holding = Math.floor(Math.random() * 15);
        if (holding <= 4) {
          if (this.bigTurtleMovementY == 1) {
            this.bigTurtleMovementY = -1;
          } else if (this.bigTurtleMovementY == -1) {
            this.bigTurtleMovementY = 1;
          }
          this.bigTurtleMovementBinary = !this.bigTurtleMovementBinary;
        }
      }
    }
  }
}
class CircleObjects extends Blueprint {
  constructor(x, y, canvasContext, radius, startAngle, endAngle) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.ctx = canvasContext;
    this.gapfiller = Math.random() < 0.7 ? true : false;
    this.vYFastVariable = this.gapfiller
      ? Math.floor(Math.random() * 3) + 1
      : Math.floor(Math.random() * 2) + 5;
    this.slowtofast = Math.random() < 0.8 ? true : false;
    this.vYSlowVariable = this.slowtofast
      ? Math.floor(Math.random() * 2) + 1
      : 4;
    this.bubbleDirector = true;
    this.vX = 2;
    this.smallBubbleDiameter = 50;
    this.bigBubbleDiameter = 90;
  }
  draw() {
    // console.log(this.ctx)
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    this.ctx.fillStyle = "rgba(0, 161, 185, 0.35)";
    this.ctx.fill();
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    this.ctx.stroke();
  }
  drawSmallBubbleHitBoxes() {
    // this.ctx.fillStyle = 'black'
    // this.ctx.fillStyle = "rgba(0, 161, 185, 0.35)";
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.rect(
      this.x - this.smallBubbleDiameter / 2,
      this.y - this.smallBubbleDiameter / 2,
      this.smallBubbleDiameter,
      this.smallBubbleDiameter
    );
    this.ctx.stroke();
  }
  drawBigBubbleHitBoxes() {
    // this.ctx.fillStyle = 'black'
    // this.ctx.fillStyle = "rgba(0, 161, 185, 0.35)";
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.rect(
      this.x - this.bigBubbleDiameter / 2,
      this.y - this.bigBubbleDiameter / 2,
      this.bigBubbleDiameter,
      this.bigBubbleDiameter
    );
    this.ctx.stroke();
  }
  bubbleDirectorChange() {
    this.bubbleDirector = !this.bubbleDirector;
  }
  changeBubbleX() {
    if (this.bubbleDirector) {
      this.vX = 3;
    } else {
      this.vX = -3;
    }
  }
  updateFastY() {
    this.y -= this.vYFastVariable;
  }
  updateSlowY() {
    this.y -= this.vYSlowVariable;
  }
  updateXDirection() {
    this.x += this.vX;
  }
  rightSmall() {
    return this.x + this.smallBubbleDiameter;
  }
  bottomSmall() {
    return this.y + this.smallBubbleDiameter;
  }
  rightBig() {
    return this.x + this.bigBubbleDiameter;
  }
  bottomBig() {
    return this.y + this.bigBubbleDiameter;
  }
  crashWithSmall(obstacle) {
    return !(
      this.bottomSmall() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.rightSmall() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
  crashWithBig(obstacle) {
    return !(
      this.bottomBig() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.rightBig() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}
class ConstantRoationObjects extends Blueprint {
  constructor(myCanvas, canvasContext, imageElement, width, height) {
    super();
    this.width = width;
    this.height = height;
    this.myCanvas = myCanvas;
    this.ctx = canvasContext;
    this.image = imageElement;
    this.x = Math.floor(Math.random() * this.myCanvas.width);
    this.y = 0;
    this.vY = 2;
    this.angle = 360;
    this.spin = Math.random() < 0.5 ? -1 : 1;
    this.crashing = false;
  }
  update() {
    this.angle += 10;
    if (this.y > this.myCanvas.height + this.height) {
      this.y = 0 - this.height;
      this.x = Math.floor(Math.random() * this.myCanvas.width);
      this.vY = Math.floor(Math.random() * 4) + 1;
      this.crashing = false;
    }
    this.y += this.vY;
  }
  draw() {
    this.ctx.save();
    this.ctx.translate(this.x - this.width / 2, this.y);
    this.ctx.rotate(((this.angle * Math.PI) / 360) * this.spin);
    // this.ctx.fillRect(0, 0, 80, 80);
    this.ctx.drawImage(
      this.image,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    this.ctx.restore();
  }
}
class ToRandomCoordinateImg extends Blueprint {
  constructor(
    x,
    y,
    canvasContext,
    myCanvas,
    baitImg,
    littleFishImg,
    displacementX,
    displacementY,
    distanceFromLeft,
    distanceFromBottom
  ) {
    super(x, y);
    this.ctx = canvasContext;
    this.myCanvas = myCanvas;
    this.baitImg = baitImg;
    this.littleFishImg = littleFishImg;
    this.displacementX = displacementX;
    this.displacementY = displacementY;
    this.distanceFromLeft = distanceFromLeft;
    this.distanceFromBottom = distanceFromBottom;
    this.randomXBait = Math.floor(
      Math.random() * (this.myCanvas.width - this.displacementX) +
      this.distanceFromLeft
    );
    this.randomYBait = Math.floor(
      Math.random() * (this.myCanvas.height - this.displacementY) +
      this.distanceFromBottom
    );
    this.randomXLittleFish = Math.floor(
      Math.random() * (this.myCanvas.width - this.displacementX) +
      this.distanceFromLeft
    );
    this.randomYLittleFish = Math.floor(
      Math.random() * (this.myCanvas.height - this.displacementY) +
      this.distanceFromBottom
    );
    this.dXX = this.randomXLittleFish - this.randomXBait;
    this.dYY = this.randomYLittleFish - this.randomYBait;
    this.multiplesOfTwoArray = [32, 64, 128, 256];
  }
  drawBait() {
    this.ctx.drawImage(this.baitImg, this.randomXBait, this.randomYBait, 1, 1);
  }
  radommizeBaitImgCoordiates() {
    this.randomXBait = Math.floor(
      Math.random() * (this.myCanvas.width - this.displacementX) +
      this.distanceFromLeft
    );
    this.randomYBait = Math.floor(
      Math.random() * (this.myCanvas.height - this.displacementY) +
      this.distanceFromBottom
    );
  }
  drawFish() {
    this.ctx.drawImage(
      this.littleFishImg,
      this.randomXLittleFish,
      this.randomYLittleFish,
      10,
      5
    );
  }
  updatedistance() {
    this.dXX =
      (this.randomXLittleFish - this.randomXBait) /
      this.multiplesOfTwoArray[Math.floor(Math.random() * 4)];
    this.dYY =
      (this.randomYLittleFish - this.randomYBait) /
      this.multiplesOfTwoArray[Math.floor(Math.random() * 4)];
  }
  updatecoodinates() {
    if (
      this.randomXLittleFish === this.randomXBait &&
      this.randomYLittleFish === this.randomYBait
    ) {
      this.radommizeBaitImgCoordiates();
      this.updatedistance();
    }
    if (this.randomXLittleFish != this.randomXBait) {
      this.randomXLittleFish -= this.dXX;
    }
    if (this.randomYLittleFish != this.randomYBait) {
      this.randomYLittleFish -= this.dYY;
    }
  }
}
const mouse = {
  x: undefined,
  y: undefined,
};
window.onload = () => {
  let bug = false;
  console.log("The page has loaded fully");
  let totalFrameCount = 0;
  let numberOfLivesArray = [];
  let binaryJellyFish = 0;
  let binaryFastJellyFish2 = 0;
  let obstacleBubblesArray = [];
  let obstacleFastBubblesArray1 = [];
  let obstacleRightSharksArray = [];
  let jellyFishArray = [];
  let toLeftJellyFishArray = [];
  let ConstantRoationObjectsArray = [];
  let bigTurtleLocation = [];
  let baitAndFishRandomArray = [];
  let redBaitAndFishRandomArray = [];
  let blueBaitAndFishRandomArray = [];
  let greenBaitAndFishRandomArray = [];
  let rotatingStarfishArray = [];
  let mainCharacterArray = [];
  let megladonArray = [];
  let sharkDirectionModulus = 0;
  let fastBubblesDirector = 0;
  let slowBubblesDirector = 0;
  // get the ctx from the Game Area
  let myCanvas = null;
  let ctx = null;
  let bigTurtleMovementX = 2;
  let bigTurtleMovementY = 1;
  document.getElementById("begin").onclick = () => {
    myGameArea.start();
    startGame();
  };
  function startGame() {
    cancelAnimationFrame(animationID);
    begginingBubblesArray = [];
    console.log(begginingBubblesArray);
    console.log("Hello Welcome");
    // Using Global scope myCanvas and ctx variables and assigning them in the function of startGame
    myCanvas = document.querySelector(".indexCanvasOne");
    ctx = myCanvas.getContext("2d");
    // Creating and drawing first background image
    const underwaterBackground = new Image();
    underwaterBackground.src = "./images/background.jpeg";
    const myBackground = new ImageObjects(
      0,
      0,
      myCanvas.width,
      myCanvas.height,
      ctx,
      underwaterBackground
    );
    underwaterBackground.addEventListener(
      "load",
      function () {
        myBackground.draw();
      },
      false
    );
    const leftSwimmingSharkImage = new Image();
    leftSwimmingSharkImage.src = "./images/SharkToLeft copy.png";
    const jellyFishImg = new Image();
    jellyFishImg.src = "./images/JellyfishToRight.png";
    const toRightJellyFishImg = new Image();
    toRightJellyFishImg.src = "./images/Jellyfish.png";
    const heartLivesImg = new Image();
    heartLivesImg.src = "./images/HEART.png";
    const friendlyTurtleImg = new Image();
    friendlyTurtleImg.src = "./images/friendlyTurtle.png";
    const baitImg = new Image();
    baitImg.src = "./images/bread.png";
    const littleFishImg = new Image();
    littleFishImg.src = "./images/littleFish.png";
    const littleRedFishImg = new Image();
    littleRedFishImg.src = "./images/red-fish.png";
    const littleBlueFishImg = new Image();
    littleBlueFishImg.src = "./images/littlebluefish.png";
    const starfishRotationImg = new Image();
    starfishRotationImg.src = "./images/starfishRotation.png";
    const littleGreenFishImg = new Image();
    littleGreenFishImg.src = "./images/littleGreenFish.png";
    const mainCharacterImg = new Image();
    mainCharacterImg.src = "./images/MainFish.png";
    const megladonImg = new Image();
    megladonImg.src = "./images/Megladon.png"
    // CREATING AND PUSHING ELEMENTS THAT HAVE A SET NUMBER OF ITEMS THROUGHOUT THE ENTIRE GAME
    function createHeartLivesInitialization() {
      let timX = 370;
      let timY = 100;
      for (let i = 0; i < numberOfLives; i++) {
        numberOfLivesArray.push(
          new ImageObjects(timX, timY, 40, 40, ctx, heartLivesImg)
        );
        timX += 50;
      }
    }
    createHeartLivesInitialization();
    // CREATE 200 BAIT AND FISH
    function createBaitAndLittleFishRandom() {
      for (let i = 0; i < 100; i++) {
        let x = Math.floor(Math.random() * myCanvas.width - 40);
        let y = Math.floor(Math.random() * myCanvas.height - 40);
        baitAndFishRandomArray.push(
          new ToRandomCoordinateImg(
            x,
            y,
            ctx,
            myCanvas,
            baitImg,
            littleFishImg,
            500,
            500,
            30,
            70
          )
        );
      }
    }
    function createRedBaitAndLittleFishRandom() {
      for (let i = 0; i < 100; i++) {
        let x = Math.floor(Math.random() * myCanvas.width - 40);
        let y = Math.floor(Math.random() * myCanvas.height - 40);
        redBaitAndFishRandomArray.push(
          new ToRandomCoordinateImg(
            x,
            y,
            ctx,
            myCanvas,
            baitImg,
            littleRedFishImg,
            400,
            500,
            300,
            300
          )
        );
      }
    }
    function createBlueBaitAndLittleFIshRandom() {
      for (let i = 0; i < 100; i++) {
        let x = Math.floor(Math.random() * myCanvas.width - 40);
        let y = Math.floor(Math.random() * myCanvas.height - 40);
        blueBaitAndFishRandomArray.push(
          new ToRandomCoordinateImg(
            x,
            y,
            ctx,
            myCanvas,
            baitImg,
            littleBlueFishImg,
            550,
            550,
            550,
            150
          )
        );
      }
    }
    function createGreenBaitAndLittleFIshRandom() {
      for (let i = 0; i < 150; i++) {
        let x = Math.floor(Math.random() * myCanvas.width - 40);
        let y = Math.floor(Math.random() * myCanvas.height - 40);
        greenBaitAndFishRandomArray.push(
          new ToRandomCoordinateImg(
            x,
            y,
            ctx,
            myCanvas,
            baitImg,
            littleGreenFishImg,
            650,
            350,
            0,
            300
          )
        );
      }
    }
    createBaitAndLittleFishRandom();
    createRedBaitAndLittleFishRandom();
    createBlueBaitAndLittleFIshRandom();
    createGreenBaitAndLittleFIshRandom();
    // console.log(numberOfLivesArray);
    function createTurtle() {
      bigTurtleLocation.push(
        new Turtle(
          0,
          myCanvas.height - 200,
          80,
          60,
          ctx,
          friendlyTurtleImg,
          myCanvas,
          bigTurtleMovementX,
          bigTurtleMovementY,
          true
        )
      );
    }
    for (let i = 0; i < 3; i++) {
      createTurtle();
    }
    // CREATING FUNCTIONS TO INVOKE ONLY NOT PUSHING ANY ELEMENTS INTO THEIR RESPECTIVE ARRAYS
    function createRotatingStarfish() {
      rotatingStarfishArray.push(
        new ConstantRoationObjects(myCanvas, ctx, starfishRotationImg, 40, 40)
      );
    }
    for (let i = 0; i < 5; i++) {
      createRotatingStarfish();
    }
    // CREATING FUNCTIONS TO INVOKE ONLY NOT PUSHING ANY ELEMENTS INTO THEIR RESPECTIVE ARRAYS
    function createMegladon() {
      megladonArray.push(new Megladon(ctx, myCanvas, megladonImg))
    }
    function createBubbles() {
      // let rectWidth = Math.floor((Math.random() * (myCanvas.width * 0.4)) + myCanvas.width * 0.2);
      // let rectX = Math.floor(Math.random() * (myCanvas.width - rectWidth))
      let randomXStart = Math.floor(Math.random() * myCanvas.width);
      obstacleBubblesArray.push(
        new CircleObjects(
          randomXStart,
          myCanvas.height + 40,
          ctx,
          40,
          0,
          2 * Math.PI
        )
      );
    }
    function createFastBubbles1() {
      // let rectWidth = Math.floor((Math.random() * (myCanvas.width * 0.4)) + myCanvas.width * 0.2);
      // let rectX = Math.floor(Math.random() * (myCanvas.width - rectWidth))
      let randomXStart = Math.floor(Math.random() * myCanvas.width);
      obstacleFastBubblesArray1.push(
        new CircleObjects(
          randomXStart,
          myCanvas.height + 20,
          ctx,
          20,
          0,
          2 * Math.PI
        )
      );
    }
    function createRightSharks() {
      obstacleRightSharksArray.push(
        new Shark(myCanvas, ctx, leftSwimmingSharkImage)
      );
    }
    function createJellyFish() {
      let xIntercept = Math.floor(Math.random() * myCanvas.width - 40);
      jellyFishArray.push(
        new ImageObjects(xIntercept, myCanvas.height, 40, 40, ctx, jellyFishImg)
      );
    }
    function createLeftJellyFish() {
      let xIntercept = Math.floor(Math.random() * myCanvas.width - 40);
      toLeftJellyFishArray.push(
        new ImageObjects(
          xIntercept,
          myCanvas.height,
          40,
          40,
          ctx,
          toRightJellyFishImg
        )
      );
    }
    function getRandomZeroOrOne() {
      binaryJellyFish = Math.floor(Math.random() * 2);
    }
    function getRandomZeroOrOne2() {
      binaryFastJellyFish2 = Math.floor(Math.random() * 2);
    }
    // myCanvas.addEventListener('click', function (event) {
    //   mouse.x = event.x;
    //   mouse.y = event.y;
    //   console.log(mouse.x)
    // })
    let canvasPosition = myCanvas.getBoundingClientRect();
    console.log(canvasPosition);
    myCanvas.addEventListener("mousemove", function (event) {
      mouse.x = event.x - (canvasPosition.left + 30);
      mouse.y = event.y - (canvasPosition.top + 30);
      bug = true
    });
    mainCharacterArray.push(
      new ImageObjects(500, 500, 150, 150, ctx, mainCharacterImg)
    );
    console.log(mainCharacterArray);
    // MAIN UPDATE FUNCTION FOR THE ENTIRE GAME --- RECURSION // MAIN UPDATE FUNCTION FOR THE ENTIRE GAME --- RECURSION
    // MAIN UPDATE FUNCTION FOR THE ENTIRE GAME --- RECURSION // MAIN UPDATE FUNCTION FOR THE ENTIRE GAME --- RECURSION
    // MAIN UPDATE FUNCTION FOR THE ENTIRE GAME --- RECURSION // MAIN UPDATE FUNCTION FOR THE ENTIRE GAME --- RECURSION

    function updateGame() {
      // CALCULATE ELAPSED FRAMES
      totalFrameCount++;
      // CALCULATE TIME INTERVAL TO UPDATE POSITIONS => CLEAR ENTIRE CANVAS => DRAW ITEMS IN NEW POSITIONS
      // CREATE ADDING INTO ARRAYS INTO CANVAS // CREATE ADDING INTO ARRAYS INTO CANVAS // CREATE ADDING INTO ARRAYS INTO CANVAS
      if (totalFrameCount % 100 === 0) {
        createFastBubbles1();
        createFastBubbles1();
        createRightSharks();
      }
      if (totalFrameCount % 150 === 0) {
        createBubbles();
        createFastBubbles1();
        createRightSharks();
      }
      if (totalFrameCount % 200 === 0) {
        createRightSharks();
        createFastBubbles1();
        getRandomZeroOrOne2();
        if (binaryFastJellyFish2 == 0) {
          createJellyFish();
          // console.log("Fast: randomly created swim to left Jellyfish")
        } else if (binaryFastJellyFish2 == 1) {
          createLeftJellyFish();
          // console.log("Fast: randomly created swim to right Jellyfish")
        }
      }
      if (totalFrameCount % 300 === 0) {
        createBubbles();
        createBubbles();
        createFastBubbles1();
        createRightSharks();
        getRandomZeroOrOne();
        if (binaryJellyFish == 0) {
          createJellyFish();
          createJellyFish();
          // console.log("Slow: randomly created swim to left Jellyfish")
        } else if (binaryJellyFish == 1) {
          createLeftJellyFish();
          createLeftJellyFish();
          // console.log("Slow: randomly created swim to right Jellyfish")
        }
      }
      if (totalFrameCount % 600 === 0) {
        createMegladon();
      }
      // UPDATE LOCATIONS // UPDATE LOCATIONS // UPDATE LOCATIONS // UPDATE LOCATIONS // UPDATE LOCATIONS // UPDATE LOCATIONS
      for (let i = 0; i < baitAndFishRandomArray.length; i++) {
        baitAndFishRandomArray[i].updatecoodinates();
      }
      for (let i = 0; i < redBaitAndFishRandomArray.length; i++) {
        redBaitAndFishRandomArray[i].updatecoodinates();
      }
      for (let i = 0; i < blueBaitAndFishRandomArray.length; i++) {
        blueBaitAndFishRandomArray[i].updatecoodinates();
      }
      for (let i = 0; i < greenBaitAndFishRandomArray.length; i++) {
        greenBaitAndFishRandomArray[i].updatecoodinates();
      }
      // UPDATE STARFISH
      if (rotatingStarfishArray.length < 3) {
        rotatingStarfishArray.push(new ConstantRoationObjects(myCanvas, ctx, starfishRotationImg, 40, 40))
      }
      for (let i = 0; i < rotatingStarfishArray.length; i++) {
        if (rotatingStarfishArray[i].crashing) {
          rotatingStarfishArray.splice(i, 1);
          i--;
        }
        rotatingStarfishArray[i].update();
        if (!rotatingStarfishArray[i].crashing) {
          let check = rotatingStarfishArray[i].crashWith(mainCharacterArray[0]);
          if (check) {
            if (mainCharacterArray[0].width > 40) {
              mainCharacterArray[0].width -= 5
            }
            if (mainCharacterArray[0].height > 30) {
              mainCharacterArray[0].height -= 5
            }
            if (mainCharacterArray[0].height <= 40 && mainCharacterArray[0].width <= 40) {
              totalScore += Math.floor(Math.random() * 5 + 1) + 4
            }
            console.log('ate starfish')
            rotatingStarfishArray[i].doubleCrashCheck();
          }
        }
      }
      // UPDATE SLOW BUBBLES POSITION IN CANVAS AND DELETE THOSE WHO ARE OUT OF FRAME
      if (totalFrameCount % 100 === 0) {
        for (let i = 0; i < obstacleBubblesArray.length; i++) {
          obstacleBubblesArray[i].changeBubbleX();
          obstacleBubblesArray[i].bubbleDirectorChange();
        }
      }
      for (let i = 0; i < obstacleBubblesArray.length; i++) {
        if (obstacleBubblesArray[i].crashing) {
          obstacleBubblesArray.splice(i, 1);
          i -= 1;
        }
        obstacleBubblesArray[i].updateSlowY();
        obstacleBubblesArray[i].updateXDirection();
        let check = obstacleBubblesArray[i].crashWithBig(mainCharacterArray[0]);
        if (check) {
          totalScore++;
          obstacleBubblesArray[i].doubleCrashCheck();

        }
        if (obstacleBubblesArray[i].y < 0 - obstacleBubblesArray[i].width) {
          obstacleBubblesArray.splice([i], 1);
          i--;
        }
      }
      // UPDATE FAST BUBBLES POSITION IN CANVAS AND DELETE THOSE WHO ARE OUT OF FRAME
      if (totalFrameCount % 30 === 0) {
        for (let i = 0; i < obstacleFastBubblesArray1.length; i++) {
          obstacleFastBubblesArray1[i].changeBubbleX();
          obstacleFastBubblesArray1[i].bubbleDirectorChange();
        }
      }
      for (let i = 0; i < obstacleFastBubblesArray1.length; i++) {
        if (obstacleFastBubblesArray1[i].crashing) {
          obstacleFastBubblesArray1.splice(i, 1);
          i -= 1;
        }
        obstacleFastBubblesArray1[i].updateFastY();
        obstacleFastBubblesArray1[i].updateXDirection();
        let check = obstacleFastBubblesArray1[i].crashWithSmall(mainCharacterArray[0]);
        if (check) {
          totalScore++;
          obstacleFastBubblesArray1[i].doubleCrashCheck();
        }
        if (
          obstacleFastBubblesArray1[i].y <
          0 - obstacleFastBubblesArray1[i].width
        ) {
          obstacleFastBubblesArray1.splice([i], 1);
          i -= 1;
        }
      }
      // UPDATE RIGHT SHARKS POSITION IN CANVAS AND DELETE THOSE WHO ARE OUT OF FRAME
      if (totalFrameCount % 80 === 0) {
        for (let i = 0; i < obstacleRightSharksArray.length; i++) {
          obstacleRightSharksArray[i].checkBinaryY();
          obstacleRightSharksArray[i].changeSharkBinaryY();
        }
      }
      for (let i = 0; i < obstacleRightSharksArray.length; i++) {
        if (obstacleRightSharksArray[i].crashing) {
          obstacleRightSharksArray.splice(i, 1);
          i -= 1;
        }
        if (
          obstacleRightSharksArray[i].accelerationBinary &&
          obstacleRightSharksArray[i].vX < 3
        ) {
          obstacleRightSharksArray[i].accelerationX +=
            obstacleRightSharksArray[i].vX * 0.015;
        }
        obstacleRightSharksArray[i].x -=
          obstacleRightSharksArray[i].vX *
          obstacleRightSharksArray[i].accelerationX;
        obstacleRightSharksArray[i].y += obstacleRightSharksArray[i].vY;
        if (
          obstacleRightSharksArray[i].x <
          0 - obstacleRightSharksArray[i].width
        ) {
          obstacleRightSharksArray.splice([i], 1);
          i -= 1;
        }
        let check = obstacleRightSharksArray[i].crashWith(mainCharacterArray[0])
        if (check) {
          numberOfLives -= 1;
          obstacleRightSharksArray[i].doubleCrashCheck();
        }
        // console.log(obstacleRightSharksArray.length);
      }
      // UPDATE TO RIGHT JELLYFISH POSITION AND DELETE THOSE WHO ARE OUT OF FRAME
      for (let i = 0; i < jellyFishArray.length; i++) {
        jellyFishArray[i].x += 0.5;
        jellyFishArray[i].y -= 1;
        if (jellyFishArray[i].x < 0 - jellyFishArray[i].width) {
          jellyFishArray.splice([i], 1);
          i -= 1;
        } else if (jellyFishArray[i].y < 0 - jellyFishArray[i].height) {
          jellyFishArray.splice([i], 1);
          i -= 1;
        }
      }
      // UPDATE TO LEFT JELLYFISH POSITION AND DELETE THOSE WHO ARE OUT OF FRAME
      for (let i = 0; i < toLeftJellyFishArray.length; i++) {
        toLeftJellyFishArray[i].x -= 0.5;
        toLeftJellyFishArray[i].y -= 1;
        if (toLeftJellyFishArray[i].x < 0 - toLeftJellyFishArray[i].width) {
          toLeftJellyFishArray.splice([i], 1);
          i -= 1;
        } else if (
          toLeftJellyFishArray[i].y <
          0 - toLeftJellyFishArray[i].height
        ) {
          toLeftJellyFishArray.splice([i], 1);
          i -= 1;
        }
      }
      for (i = 0; i < bigTurtleLocation.length; i++) {
        bigTurtleLocation[i].updateTurtle();
      }
      if (totalFrameCount % 5 == 0) {
        for (i = 0; i < bigTurtleLocation.length; i++) {
          bigTurtleLocation[i].randomizingTurtle();
        }
      }
      for (let i = 1; i < megladonArray.length; i++) {
        if (megladonArray[i].collision) {
          megladonArray.splice(i, 1);
          i--;
        }
        let check = (megladonArray[i].crashWith(mainCharacterArray[0]))
        if (check) {
          console.log("That's a big shark")
          numberOfLives -= 2
          megladonArray[i].collisionUpdate();
        }
        if (megladonArray[i].x > myCanvas.width + megladonArray[i].width) {
          megladonArray.splice(i, 1);
          i--;
        }
        megladonArray[i].update();
      }
      // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR
      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      // REDRAWING // // REDRAWING // // REDRAWING // // REDRAWING // // REDRAWING // // REDRAWING // // REDRAWING // // REDRAWING
      // DRAW BACKGROUND
      myBackground.draw();
      // DRAW TURTLE
      for (i = 0; i < bigTurtleLocation.length; i++) {
        bigTurtleLocation[i].draw();
      }
      ctx.font = "50px serif";
      // ctx.fillStyle = "rgba(0, 133, 255, 0.6)";
      ctx.fillStyle = "black";
      ctx.fillText("LIVES: " + numberOfLives, myCanvas.width / 2 - 100, 80);
      ctx.fillText(`Score : ${totalScore}`, 500, 400);
      // console.log(totalFrameCount)
      // DRAW BAIT AND FISH
      for (let i = 0; i < baitAndFishRandomArray.length; i++) {
        baitAndFishRandomArray[i].drawBait();
        baitAndFishRandomArray[i].drawFish();
      }
      for (let i = 0; i < redBaitAndFishRandomArray.length; i++) {
        redBaitAndFishRandomArray[i].drawBait();
        redBaitAndFishRandomArray[i].drawFish();
      }
      for (let i = 0; i < blueBaitAndFishRandomArray.length; i++) {
        blueBaitAndFishRandomArray[i].drawBait();
        blueBaitAndFishRandomArray[i].drawFish();
      }
      for (let i = 0; i < greenBaitAndFishRandomArray.length; i++) {
        greenBaitAndFishRandomArray[i].drawBait();
        greenBaitAndFishRandomArray[i].drawFish();
      }
      for (let i = 0; i < numberOfLives; i++) {
        numberOfLivesArray[i].draw();
      }
      // DRAW STARFISH
      for (let i = 0; i < rotatingStarfishArray.length; i++) {
        rotatingStarfishArray[i].draw();
      }
      // DRAW BUBBLES
      for (let i = 0; i < obstacleBubblesArray.length; i++) {
        obstacleBubblesArray[i].draw();
        // obstacleBubblesArray[i].drawBigBubbleHitBoxes();
      }
      //  DRAW FAST BUBBLES
      for (let i = 0; i < obstacleFastBubblesArray1.length; i++) {
        obstacleFastBubblesArray1[i].draw();
        // obstacleFastBubblesArray1[i].drawSmallBubbleHitBoxes();
      }
      // DRAW SHARKS
      for (let i = 0; i < obstacleRightSharksArray.length; i++) {
        obstacleRightSharksArray[i].draw();
      }
      // DRAW TO RIGHT JELLYFISH
      for (let i = 0; i < jellyFishArray.length; i++) {
        jellyFishArray[i].draw();
      }
      // DRAW TO LEFT JELLYFISH
      for (let i = 0; i < toLeftJellyFishArray.length; i++) {
        toLeftJellyFishArray[i].draw();
      }
      for (let i = 1; i < megladonArray.length; i++) {
        // megladonArray[i].draw0()
        megladonArray[i].counter++
        if (megladonArray[i].counter > 230) {
          megladonArray[i].draw3()
          console.log(megladonArray[i].rotate1)
          continue;
        }
        if (megladonArray[i].x < 400) {
          megladonArray[i].draw1()
        } else {
          megladonArray[i].draw2()
          megladonArray[i].counter++
        }
      }
      // DRAW MAIN CHARACTER
      if (bug) {
        mainCharacterArray[0].mainCharacterLocationFunction();
        mainCharacterArray[0].draw();
      }
      if (numberOfLives <= 0) {
        clearInterval(intervalId)
        console.log(finalscoreWebpage)
        console.log(myGameArea)
        finalscoreWebpage.end();
      }
      // console.log(`Currenly running SetInterval for main game animation`);
    }
    intervalId = setInterval(updateGame, 20);
    console.log(ctx)
    const finalscoreWebpage = {
      section: document.createElement("section"),
      finalize: document.querySelector('.indexCanvasOne'),
      tohidden: document.querySelector('.hidden'),
      currentCanvas: document.querySelector('.indexCanvasOne'),
      end: function () {
        this.section.className = 'scoreboard';
        this.section.innerHTML = `<div class="scoreInfo"><div class="finalScoreboard"><table><thead><tr><th>Rank</th><th>Username</th><th>Points</th></tr></thead><tbody><tr><td>1</td><td>Micheal</td><td>102140810</td></tr><tr><td>2</td><td>Player521</td><td>1509234</td></tr><tr><td>3</td><td>Marley</td><td>11237</td></tr><tr><td>4</td><td>Abigail</td><td>10076</td></tr><tr><td>5</td><td>Evelyn</td><td>9895</td></tr><tr><td>6</td><td>player851</td><td>8871</td></tr><tr><td>7</td><td>player341</td><td>7642</td></tr><tr><td>8</td><td>player583</td><td>7505</td></tr><tr><td>9</td><td>Zion</td><td>7179</td></tr><tr><td>10</td><td>George</td><td>7105</td></tr><tr><td>11</td><td>Micheal</td><td>4801</td></tr><tr><td>12</td><td>Wilson</td><td>4063</td></tr><tr><td>13</td><td>player283</td><td>2938</td></tr><td>14</td><td>${playerName}</td><td>${totalScore}</td></tr><tr><td>15</td><td>player82</td><td>15</td></tr></tbody></table></div><button class="restart-btn">RESTART GAME></button></div>`;
        document.body.insertBefore(this.section, this.tohidden);
        this.currentCanvas.className = 'hidden';
      }
    }

  }
};