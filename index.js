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
    this.x = mouse.x
    this.y = mouse.y
  }
}
class Shark extends ImageObjects {
  constructor(x, y, width, height, canvasContext, imageElement) {
    super(x, y, width, height, canvasContext);
    this.image = imageElement;
    this.vX = Math.random() < 0.2 ? 6 : Math.floor(Math.random() * 4) + 2;
    this.accelerationBinary = Math.random() < 0.8 ? true : false;
    this.accelerationX = 1;
    this.sharkBinary = true;
    this.vY = 0;
  }
  draw() {
    // console.log(this.ctx)
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  changeSharkBinary() {
    this.sharkBinary = !this.sharkBinary
  }
  checkBinary() {
    if (this.sharkBinary) {
      this.vY = 1.5
    } else {
      this.vY = -2
    }
  }
}
class Turtle extends Blueprint {
  constructor(x, y, width, height, canvasContext, imageElement, myCanvas, bigTurtleMovementX, bigTurtleMovementY, bigTurtleMovementBinary) {
    super(x, y, width, height, canvasContext);
    this.image = imageElement;
    this.myCanvas = myCanvas;
    this.bigTurtleMovementX = bigTurtleMovementX;
    this.bigTurtleMovementY = bigTurtleMovementY;
    this.bigTurtleMovementBinary = bigTurtleMovementBinary
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
    super(x, y);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.ctx = canvasContext;
    this.gapfiller = Math.random() < 0.70 ? true : false;
    this.speedFastVariable = this.gapfiller ? (Math.floor(Math.random() * 3) + 1) : (Math.floor(Math.random() * 2) + 5)
    this.slowtofast = Math.random() < 0.80 ? true : false;
    this.speedSlowVariable = this.slowtofast ? (Math.floor(Math.random() * 2)) : 4;
    this.bubbleDirector = true;
    this.vX = 2;
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
  bubbleDirectorChange() {
    this.bubbleDirector = !this.bubbleDirector
  }
  changeBubbleX() {
    if (this.bubbleDirector) {
      this.vX = 3;
    } else {
      this.vX = -3;
    }
  }
}
class ConstantRoationObjects extends Blueprint {
  constructor(myCanvas, canvasContext, imageElement, width, height) {
    super();
    this.width = width;
    this.height = height;
    this.myCanvas = myCanvas
    this.ctx = canvasContext;
    this.image = imageElement;
    this.x = Math.floor(Math.random() * this.myCanvas.width)
    this.y = 0
    this.vY = 2;
    this.angle = 360;
    this.spin = Math.random() < 0.5 ? -1 : 1;
  }
  update() {
    this.angle += 10
    if (this.y > this.myCanvas.height + this.height) {
      this.y = 0 - this.height;
      this.x = Math.floor(Math.random() * this.myCanvas.width);
      this.vY = Math.floor(Math.random() * 4) + 1;
    }
    this.y += this.vY
  }
  draw() {
    this.ctx.save();
    this.ctx.translate(this.x - this.width / 2, this.y);
    this.ctx.rotate(this.angle * Math.PI / 360 * this.spin);
    // this.ctx.fillRect(0, 0, 80, 80);
    this.ctx.drawImage(this.image, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
    this.ctx.restore();
  }
}
class ToRandomCoordinateImg extends Blueprint {
  constructor(x, y, canvasContext, myCanvas, baitImg, littleFishImg, displacementX, displacementY, distanceFromLeft, distanceFromBottom) {
    super(x, y);
    this.ctx = canvasContext;
    this.myCanvas = myCanvas
    this.baitImg = baitImg;
    this.littleFishImg = littleFishImg;
    this.displacementX = displacementX;
    this.displacementY = displacementY;
    this.distanceFromLeft = distanceFromLeft;
    this.distanceFromBottom = distanceFromBottom;
    this.randomXBait = Math.floor(Math.random() * (this.myCanvas.width - this.displacementX) + this.distanceFromLeft);
    this.randomYBait = Math.floor(Math.random() * (this.myCanvas.height - this.displacementY) + this.distanceFromBottom);
    this.randomXLittleFish = Math.floor(Math.random() * (this.myCanvas.width - this.displacementX) + this.distanceFromLeft);
    this.randomYLittleFish = Math.floor(Math.random() * (this.myCanvas.height - this.displacementY) + this.distanceFromBottom);
    this.dXX = this.randomXLittleFish - this.randomXBait;
    this.dYY = this.randomYLittleFish - this.randomYBait;
    this.multiplesOfTwoArray = [32, 64, 128, 256]
  }
  drawBait() {
    this.ctx.drawImage(this.baitImg, this.randomXBait, this.randomYBait, 1, 1);
  }
  radommizeBaitImgCoordiates() {
    this.randomXBait = Math.floor(Math.random() * (this.myCanvas.width - this.displacementX) + this.distanceFromLeft)
    this.randomYBait = Math.floor(Math.random() * (this.myCanvas.height - this.displacementY) + this.distanceFromBottom)
  }
  drawFish() {
    this.ctx.drawImage(this.littleFishImg, this.randomXLittleFish, this.randomYLittleFish, 10, 5);
  }
  updatedistance() {
    this.dXX = (this.randomXLittleFish - this.randomXBait) / this.multiplesOfTwoArray[(Math.floor(Math.random() * 4))];
    this.dYY = (this.randomYLittleFish - this.randomYBait) / this.multiplesOfTwoArray[(Math.floor(Math.random() * 4))];
  }
  updatecoodinates() {
    if (this.randomXLittleFish === this.randomXBait && this.randomYLittleFish === this.randomYBait) {
      this.radommizeBaitImgCoordiates();
      this.updatedistance();
    }
    if (this.randomXLittleFish != this.randomXBait) {
      this.randomXLittleFish -= this.dXX
    }
    if (this.randomYLittleFish != this.randomYBait) {
      this.randomYLittleFish -= this.dYY
    }
  }
}
const mouse = {
  x: undefined, y: undefined,
}
window.onload = () => {
  console.log("The page has loaded fully")
  let totalFrameCount = 0;
  let numberOfLives = 10;
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
  let intervalId = null;
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
    baitImg.src = "./images/bread.png"
    const littleFishImg = new Image();
    littleFishImg.src = "./images/littleFish.png"
    const littleRedFishImg = new Image();
    littleRedFishImg.src = "./images/red-fish.png"
    const littleBlueFishImg = new Image();
    littleBlueFishImg.src = "./images/littlebluefish.png"
    const starfishRotationImg = new Image();
    starfishRotationImg.src = "./images/starfishRotation.png"
    const littleGreenFishImg = new Image();
    littleGreenFishImg.src = "./images/littleGreenFish.png"
    const mainCharacterImg = new Image();
    mainCharacterImg.src = "./images/MainFish.png"
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
        let x = Math.floor(Math.random() * myCanvas.width - 40)
        let y = Math.floor(Math.random() * myCanvas.height - 40)
        baitAndFishRandomArray.push(new ToRandomCoordinateImg(x, y, ctx, myCanvas, baitImg, littleFishImg, 500, 500, 30, 70))
      }
    }
    function createRedBaitAndLittleFishRandom() {
      for (let i = 0; i < 100; i++) {
        let x = Math.floor(Math.random() * myCanvas.width - 40)
        let y = Math.floor(Math.random() * myCanvas.height - 40)
        redBaitAndFishRandomArray.push(new ToRandomCoordinateImg(x, y, ctx, myCanvas, baitImg, littleRedFishImg, 400, 500, 300, 300))
      }
    }
    function createBlueBaitAndLittleFIshRandom() {
      for (let i = 0; i < 100; i++) {
        let x = Math.floor(Math.random() * myCanvas.width - 40)
        let y = Math.floor(Math.random() * myCanvas.height - 40)
        blueBaitAndFishRandomArray.push(new ToRandomCoordinateImg(x, y, ctx, myCanvas, baitImg, littleBlueFishImg, 550, 550, 550, 150))
      }
    }
    function createGreenBaitAndLittleFIshRandom() {
      for (let i = 0; i < 150; i++) {
        let x = Math.floor(Math.random() * myCanvas.width - 40)
        let y = Math.floor(Math.random() * myCanvas.height - 40)
        greenBaitAndFishRandomArray.push(new ToRandomCoordinateImg(x, y, ctx, myCanvas, baitImg, littleGreenFishImg, 650, 350, 0, 300))
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
          100,
          60,
          ctx,
          friendlyTurtleImg, myCanvas, bigTurtleMovementX, bigTurtleMovementY, true
        )
      );
    }
    for (let i = 0; i < 3; i++) {
      createTurtle();
    }
    function createRotatingStarfish() {
      rotatingStarfishArray.push(new ConstantRoationObjects(myCanvas, ctx, starfishRotationImg, 40, 40))
    }
    for (let i = 0; i < 6; i++) {
      createRotatingStarfish()
    }
    // CREATING FUNCTIONS TO INVOKE ONLY NOT PUSHING ANY ELEMENTS INTO THEIR RESPECTIVE ARRAYS
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
      let heightRandom = Math.floor(
        Math.random() * (myCanvas.height * 0.60 - 40)
      );
      obstacleRightSharksArray.push(
        new Shark(
          myCanvas.width,
          heightRandom,
          200,
          60,
          ctx,
          leftSwimmingSharkImage
        )
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
    myCanvas.addEventListener('mousemove', function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
    })
    // function drawMainCharacter() {
    //   ctx.fillStyle = 'black'
    //   ctx.beginPath();
    //   ctx.arc(mouse.x , mouse.y, 30, 0, Math.PI*2);
    //   ctx.fill();
    //   console.log('drew circle')
    // }
    // setInterval(drawMainCharacter, 15)
    mainCharacterArray.push(new ImageObjects(mouse.x, mouse.y, 50, 50, ctx, mainCharacterImg))
    console.log(mainCharacterArray)

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
      // UPDATE LOCATIONS // UPDATE LOCATIONS // UPDATE LOCATIONS // UPDATE LOCATIONS // UPDATE LOCATIONS // UPDATE LOCATIONS 
      for (let i = 0; i < baitAndFishRandomArray.length; i++) {
        baitAndFishRandomArray[i].updatecoodinates()
      }
      for (let i = 0; i < redBaitAndFishRandomArray.length; i++) {
        redBaitAndFishRandomArray[i].updatecoodinates()
      }
      for (let i = 0; i < blueBaitAndFishRandomArray.length; i++) {
        blueBaitAndFishRandomArray[i].updatecoodinates()
      }
      for (let i = 0; i < greenBaitAndFishRandomArray.length; i++) {
        greenBaitAndFishRandomArray[i].updatecoodinates()
      }
      // UPDATE STARFISH 
      for (let i = 0; i < rotatingStarfishArray.length; i++) {
        rotatingStarfishArray[i].update()
        console.log(rotatingStarfishArray.length)
      }
      // UPDATE SLOW BUBBLES POSITION IN CANVAS AND DELETE THOSE WHO ARE OUT OF FRAME
      if (totalFrameCount % 100 === 0) {
        for (let i = 0; i < obstacleBubblesArray.length; i++) {
          obstacleBubblesArray[i].changeBubbleX();
          obstacleBubblesArray[i].bubbleDirectorChange();
        }
      }
      for (let i = 0; i < obstacleBubblesArray.length; i++) {
        obstacleBubblesArray[i].y -= 1 + obstacleBubblesArray[i].speedSlowVariable;
        obstacleBubblesArray[i].x += (obstacleBubblesArray[i].vX);
        if (obstacleBubblesArray[i].y < 0 - obstacleBubblesArray[i].width) {
          obstacleBubblesArray.splice([i], 1);
          i -= 1;
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
        obstacleFastBubblesArray1[i].y -= obstacleFastBubblesArray1[i].speedFastVariable;
        obstacleFastBubblesArray1[i].x += (obstacleFastBubblesArray1[i].vX);
        if (obstacleFastBubblesArray1[i].y < (0 - obstacleFastBubblesArray1[i].width)) {
          obstacleFastBubblesArray1.splice([i], 1);
          i -= 1;
        }
      }
      // UPDATE RIGHT SHARKS POSITION IN CANVAS AND DELETE THOSE WHO ARE OUT OF FRAME
      if (totalFrameCount % 80 === 0) {
        for (let i = 0; i < obstacleRightSharksArray.length; i++) {
          obstacleRightSharksArray[i].checkBinary();
          obstacleRightSharksArray[i].changeSharkBinary();

        }
      }
      for (let i = 0; i < obstacleRightSharksArray.length; i++) {
        if (obstacleRightSharksArray[i].accelerationBinary && obstacleRightSharksArray[i].vX < 3) {
          obstacleRightSharksArray[i].accelerationX += (obstacleRightSharksArray[i].vX * 0.015)
        }
        obstacleRightSharksArray[i].x -= obstacleRightSharksArray[i].vX * obstacleRightSharksArray[i].accelerationX
        obstacleRightSharksArray[i].y += obstacleRightSharksArray[i].vY
        if (
          obstacleRightSharksArray[i].x <
          0 - obstacleRightSharksArray[i].width
        ) {
          obstacleRightSharksArray.splice([i], 1);
          i -= 1;
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
        // console.log(jellyFishArray.length)
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
        // console.log(toLeftJellyFishArray.length)
      }
      for (i = 0; i < bigTurtleLocation.length; i++) {
        bigTurtleLocation[i].updateTurtle()
      }
      if (totalFrameCount % 5 == 0) {
        for (i = 0; i < bigTurtleLocation.length; i++) {
          bigTurtleLocation[i].randomizingTurtle()
        }
      }
      // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR // // CLEAR
      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      // REDRAWING // // REDRAWING // // REDRAWING // // REDRAWING // // REDRAWING // // REDRAWING // // REDRAWING // // REDRAWING
      // DRAW BACKGROUND
      myBackground.draw();
      // DRAW TURTLE
      for (i = 0; i < bigTurtleLocation.length; i++) {
        bigTurtleLocation[i].draw()
      }
      ctx.font = "50px serif";
      // ctx.fillStyle = "rgba(0, 133, 255, 0.6)";
      ctx.fillStyle = "black";
      ctx.fillText("LIVES: " + numberOfLives, myCanvas.width / 2 - 100, 80);
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
        rotatingStarfishArray[i].draw()
      }
      // DRAW BUBBLES
      for (let i = 0; i < obstacleBubblesArray.length; i++) {
        obstacleBubblesArray[i].draw();
      }
      //  DRAW FAST BUBBLES
      for (let i = 0; i < obstacleFastBubblesArray1.length; i++) {
        obstacleFastBubblesArray1[i].draw();
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
      // DRAW MAIN CHARACTER
      mainCharacterArray[0].mainCharacterLocationFunction()
      mainCharacterArray[0].draw()
    }
    intervald = setInterval(updateGame, 15);
  }
};
