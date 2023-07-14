window.addEventListener("load", function () {
  const canvas = document.querySelector("#canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;

  ctx.fillStyle = "white";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  ctx.font = "40px Bangers";
  ctx.textAlign = "center";

  class Player {
    constructor(game) {
      this.game = game;
      this.collisionX = this.game.width * 0.5;
      this.collisionY = this.game.height * 0.5;
      this.collisionRadius = 30;
      this.speedX = 0;
      this.speedY = 0;
      this.distanceX = 0;
      this.distanceY = 0;
      this.speedModifier = 10;
      this.spriteWidth = 255;
      this.spriteHeight = 256;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX;
      this.spriteY;
      this.frameX = 0;
      this.frameY = 0;
      this.image = bull;
    }

    restart() {
      this.collisionX = this.game.width * 0.5;
      this.collisionY = this.game.height * 0.5;
      this.spriteX = this.collisionX - this.width * 0.5 - 5;
      this.spriteY = this.collisionY - this.height * 0.5 - 80;
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );

      if (this.game.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
        context.beginPath();
        context.moveTo(this.collisionX, this.collisionY);
        context.lineTo(this.game.mouse.x, this.game.mouse.y);
        context.stroke();
      }
    }

    update() {
      this.distanceX = this.game.mouse.x - this.collisionX;
      this.distanceY = this.game.mouse.y - this.collisionY;

      //sprite animation
      const angle = Math.atan2(this.distanceY, this.distanceX);
      if (angle < -2.74 || angle > 2.74) this.frameY = 6;
      else if (angle < -1.96) this.frameY = 7;
      else if (angle < -1.17) this.frameY = 0;
      else if (angle < -0.39) this.frameY = 1;
      else if (angle < 0.39) this.frameY = 2;
      else if (angle < 1.17) this.frameY = 3;
      else if (angle < 1.96) this.frameY = 4;
      else if (angle < 2.74) this.frameY = 5;

      const distance = Math.hypot(this.distanceX, this.distanceY);
      if (distance > this.speedModifier) {
        this.speedX = this.distanceX / distance || 0;
        this.speedY = this.distanceY / distance || 0;
      } else {
        this.speedX = 0;
        this.speedY = 0;
      }

      this.collisionX += this.speedX * this.speedModifier;
      this.collisionY += this.speedY * this.speedModifier;
      this.spriteX = this.collisionX - this.width * 0.5 - 5;
      this.spriteY = this.collisionY - this.height * 0.5 - 80;
      // horizontal boundaries
      if (this.collisionX < this.collisionRadius)
        this.collisionX = this.collisionRadius;
      else if (this.collisionX > this.game.width - this.collisionRadius)
        this.collisionX = this.game.width - this.collisionRadius;
      // vertical boundaries
      if (this.collisionY < this.game.topMargin + this.collisionRadius)
        this.collisionY = this.game.topMargin + this.collisionRadius;
      else if (this.collisionY > this.game.height - this.collisionRadius)
        this.collisionY = this.game.height - this.collisionRadius;
      // collisions with obstacles
      this.game.obstacles.forEach((obstacle) => {
        /* [
          distance < sumOfRadii,
          distance,
          sumOfRadii,
          distanceX,
          distanceY,
        ] */
        let [collision, distance, sumOfRadii, distanceX, distanceY] =
          this.game.checkCollision(this, obstacle);
        if (collision) {
          const unit_x = distanceX / distance;
          const unit_y = distanceY / distance;
          this.collisionX = obstacle.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = obstacle.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });
    }
  }

  class Obstacle {
    constructor(game) {
      this.game = game;
      this.collisionX = Math.random() * this.game.width;
      this.collisionY = Math.random() * this.game.height;
      this.collisionRadius = 45;
      this.image = obstacles;
      this.spriteWidth = 250;
      this.spriteHeight = 250;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 55;
      this.frameX = Math.floor(Math.random() * 4);
      this.frameY = Math.floor(Math.random() * 3);
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );
      if (this.game.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
      }
    }
    update() {}
  }

  class Egg {
    constructor(game) {
      this.game = game;
      this.collisionRadius = 40;
      this.margin = this.collisionRadius * 2.5;
      this.collisionX =
        this.margin + Math.random() * (this.game.width - this.margin * 2);
      this.collisionY =
        this.game.topMargin +
        Math.random() * (this.game.height - this.game.topMargin - this.margin);
      this.image = egg;
      this.spriteWidth = 110;
      this.spriteHeight = 135;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX;
      this.spriteY;
      this.hatchTimer = 0;
      this.hatchInterval = 5000;
      this.markedForDeletion = false;
    }
    draw(context) {
      context.drawImage(this.image, this.spriteX, this.spriteY);

      if (this.game.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
        context.beginPath();
        context.stroke();
        const displayTimer = (this.hatchTimer * 0.001).toFixed(0);
        context.fillText(
          displayTimer,
          this.collisionX,
          this.collisionY - this.collisionRadius * 2.5
        );
      }
    }

    update(deltaTime) {
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 30;
      // collisions
      let collisionObjects = [
        this.game.player,
        ...this.game.obstacles,
        ...this.game.enemies,
      ];
      collisionObjects.forEach((object) => {
        let [collision, distance, sumOfRadii, distanceX, distanceY] =
          this.game.checkCollision(this, object);
        if (collision) {
          const unit_x = distanceX / distance;
          const unit_y = distanceY / distance;
          this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });
      // hatching
      if (
        this.hatchTimer > this.hatchInterval ||
        this.collisionY < this.game.topMargin
      ) {
        this.game.hatchlings.push(
          new Larva(this.game, this.collisionX, this.collisionY)
        );
        this.markedForDeletion = true;
        this.game.removeGameObjects();
        //console.log(this.game.eggs);
      }
      this.hatchTimer += deltaTime;
    }
  }

  class Larva {
    constructor(game, x, y) {
      this.game = game;
      this.collisionX = x;
      this.collisionY = y;
      this.collisionRadius = 30;
      this.image = larva;
      this.spriteWidth = 150;
      this.spriteHeight = 150;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX;
      this.spriteY;
      this.speedY = 1 + Math.random();
      this.frameX = 0;
      this.frameY = Math.floor(Math.random() * 2);
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );

      if (this.game.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
        context.beginPath();
        context.stroke();
      }
    }

    update() {
      this.collisionY -= this.speedY;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 50;
      // move to safety
      if (this.collisionY < this.game.topMargin) {
        this.markedForDeletion = true;
        this.game.removeGameObjects();
        if (this.game.gameOver === false) this.game.score++;
        for (let i = 0; i < 3; i++) {
          this.game.particles.push(
            new Firefly(this.game, this.collisionX, this.collisionY, "orange")
          );
        }
      }

      // collision with objects
      let collisionObjects = [
        this.game.player,
        ...this.game.obstacles,
        ...this.game.eggs,
      ];
      collisionObjects.forEach((object) => {
        let [collision, distance, sumOfRadii, distanceX, distanceY] =
          this.game.checkCollision(this, object);
        if (collision) {
          const unit_x = distanceX / distance;
          const unit_y = distanceY / distance;
          this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });

      // collision with enemies
      this.game.enemies.forEach((enemy) => {
        if (this.game.checkCollision(this, enemy)[0]) {
          this.markedForDeletion = true;
          this.game.removeGameObjects();
          if (this.game.gameOver === false) this.game.lostHatchlings++;
          for (let i = 0; i < 5; i++) {
            this.game.particles.push(
              new Spark(this.game, this.collisionX, this.collisionY, "green")
            );
          }
        }
      });
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.collisionRadius = 30;
      this.speedX = Math.random() * 3 + 1;
      this.image = toads;
      this.spriteWidth = 140;
      this.spriteHeight = 260;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.collisionX =
        this.game.width + this.width + Math.random() * this.game.width * 0.5;
      this.collisionY =
        this.game.topMargin +
        Math.random() * (this.game.height - this.game.topMargin);
      this.spriteX;
      this.spriteY;
      this.frameX = 0;
      this.frameY = Math.floor(Math.random() * 4);
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );

      if (this.game.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
        context.beginPath();
        context.stroke();
      }
    }

    update() {
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 70;
      this.collisionX -= this.speedX;
      // enemies respawn on the right after offscreen to the left
      if (this.spriteX + this.width < 0 && this.game.gameOver === false) {
        this.collisionX =
          this.game.width + this.width + Math.random() * this.game.width * 0.5;
        this.collisionY =
          this.game.topMargin +
          Math.random() * (this.game.height - this.game.topMargin);
        this.frameY = Math.floor(Math.random() * 4);
      }

      let collisionObjects = [this.game.player, ...this.game.obstacles];
      collisionObjects.forEach((object) => {
        let [collision, distance, sumOfRadii, distanceX, distanceY] =
          this.game.checkCollision(this, object);
        if (collision) {
          const unit_x = distanceX / distance;
          const unit_y = distanceY / distance;
          this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });
    }
  }

  class Particle {
    constructor(game, x, y, color) {
      this.game = game;
      this.collisionX = x;
      this.collisionY = y;
      this.color = color;
      this.radius = Math.floor(Math.random() * 10 + 5);
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * 0.5 + 2.5;
      this.angle = 0;
      this.velocityAngle = Math.random() * 0.1 + 0.01;
      this.markedForDeletion = false;
    }

    draw(context) {
      context.save();
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(
        this.collisionX,
        this.collisionY,
        this.radius,
        0,
        Math.PI * 2
      );
      context.fill();
      context.stroke();
      context.restore();
    }
  }

  class Firefly extends Particle {
    update() {
      this.angle += this.velocityAngle;
      this.collisionX += this.speedX;
      this.collisionY -= this.speedY;
      if (this.collisionY < 0 - this.radius) {
        this.markedForDeletion = true;
        this.game.removeGameObjects();
      }
    }
  }

  class Spark extends Particle {
    update() {
      this.angle += this.velocityAngle * 0.5;
      this.collisionX -= Math.cos(this.angle) * this.speedX;
      this.collisionY -= Math.sin(this.angle) * this.speedY;
      if (this.radius > 0.1) this.radius -= 0.05;
      if (this.radius < 0.2) {
        this.markedForDeletion = true;
        this.game.removeGameObjects();
      }
    }
  }

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.topMargin = 220;
      this.debug = true;
      this.fps = 70;
      this.timer = 0;
      this.interval = 1000 / this.fps;
      this.eggTimer = 0;
      this.eggInterval = 1000;
      this.numberOfObstacles = 5;
      this.maxEggs = 5;
      this.gameObjects = [];
      this.obstacles = [];
      this.eggs = [];
      this.hatchlings = [];
      this.enemies = [];
      this.particles = [];
      this.score = 0;
      this.winningScore = 10;
      this.lostHatchlings = 0;
      this.gameOver = false;
      this.player = new Player(this);
      this.mouse = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        pressed: false,
      };

      // event listeners

      canvas.addEventListener("mousedown", (e) => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = true;
      });

      canvas.addEventListener("mouseup", (e) => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = false;
      });

      canvas.addEventListener("mousemove", (e) => {
        if (this.mouse.pressed) {
          this.mouse.x = e.offsetX;
          this.mouse.y = e.offsetY;
        }
      });

      window.addEventListener("keydown", (e) => {
        if (e.key === "d") this.debug = !this.debug;
        else if (e.key === "r") this.restart();
      });
    }
    render(context, deltaTime) {
      if (this.timer > this.interval) {
        context.clearRect(0, 0, this.width, this.height);
        this.gameObjects = [
          ...this.eggs,
          ...this.obstacles,
          this.player,
          ...this.enemies,
          ...this.hatchlings,
          ...this.particles,
        ];
        // sort by vertical position
        this.gameObjects.sort((a, b) => {
          return a.collisionY - b.collisionY;
        });

        this.gameObjects.forEach((object) => {
          object.draw(context);
          object.update(deltaTime);
        });
        this.timer = 0;
      }
      this.timer += deltaTime;

      // add eggs periodically
      if (
        this.eggTimer > this.eggInterval &&
        this.eggs.length < this.maxEggs &&
        this.gameOver === false
      ) {
        this.addEgg();
        this.eggTimer = 0;
        //console.log(this.eggs);
      }
      this.eggTimer += deltaTime;

      // draw status text
      context.save();
      context.textAlign = "left";
      context.fillText(`Score: ${this.score}`, 25, 50);
      if (this.debug) {
        context.fillText(`Lost: ${this.lostHatchlings}`, 25, 100);
      }
      context.restore();

      // win-lose message
      if (this.score >= this.winningScore) {
        this.gameOver = true;
        context.save();
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, this.width, this.height);
        context.fillStyle = "white";
        context.textAlign = "center";
        context.shadowOffsetX = 3;
        context.shadowOffsetY = 3;
        context.shadowColor = "green";
        let message1;
        let message2;
        if (this.lostHatchlings <= 5) {
          message1 = "The forest is satisfied!";
          message2 = "Good job!";
        } else {
          message1 = "Better luck next time!";
          message2 = `You lost ${this.lostHatchlings} hatchlings!`;
        }
        context.font = "100px Bangers";
        context.fillText(message1, this.width * 0.5, this.height * 0.5 - 20);
        context.font = "40px Bangers";
        context.fillText(message2, this.width * 0.5, this.height * 0.5 + 30);
        context.fillText(
          `Final Score is ${this.score}, Press 'r' to try again!`,
          this.width * 0.5,
          this.height * 0.5 + 80
        );
        context.restore();
      }
    }

    checkCollision(a, b) {
      const distanceX = a.collisionX - b.collisionX;
      const distanceY = a.collisionY - b.collisionY;
      const distance = Math.hypot(distanceY, distanceX);
      const sumOfRadii = a.collisionRadius + b.collisionRadius;
      return [
        distance < sumOfRadii,
        distance,
        sumOfRadii,
        distanceX,
        distanceY,
      ];
    }

    addEgg() {
      this.eggs.push(new Egg(this));
    }

    addEnemy() {
      this.enemies.push(new Enemy(this));
    }

    removeGameObjects() {
      this.eggs = this.eggs.filter((object) => !object.markedForDeletion);
      this.hatchlings = this.hatchlings.filter(
        (hatchling) => !hatchling.markedForDeletion
      );
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      //console.log(this.gameObjects);
    }

    restart() {
      this.player.restart();
      this.obstacles = [];
      this.eggs = [];
      this.hatchlings = [];
      this.enemies = [];
      this.particles = [];
      this.mouse = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        pressed: false,
      };
      this.score = 0;
      this.lostHatchlings = 0;
      this.gameOver = false;
      this.init();
    }

    init() {
      for (let i = 0; i < 4; i++) {
        this.addEnemy();
        //console.log(this.enemies);
      }
      let attempts = 0;
      while (this.obstacles.length < this.numberOfObstacles && attempts < 500) {
        let testObstacle = new Obstacle(this);
        let overlap = false;
        this.obstacles.forEach((obstacle) => {
          const distanceX = testObstacle.collisionX - obstacle.collisionX;
          const distanceY = testObstacle.collisionY - obstacle.collisionY;
          const distance = Math.hypot(distanceY, distanceX);
          const distanceBuffer = 100;
          const sumOfRadii =
            testObstacle.collisionRadius +
            obstacle.collisionRadius +
            distanceBuffer;
          if (distance < sumOfRadii) {
            overlap = true;
          }
        });
        const margin = testObstacle.collisionRadius * 2;
        if (
          !overlap &&
          testObstacle.spriteX > 0 &&
          testObstacle.spriteX < this.width - testObstacle.width &&
          testObstacle.spriteY > this.topMargin - margin &&
          testObstacle.spriteY < this.height - margin
        ) {
          this.obstacles.push(testObstacle);
        }
        attempts++;
      }
    }
  }

  const game = new Game(canvas);
  game.init();
  console.log(game);

  let previousTimeStamp = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - previousTimeStamp;
    previousTimeStamp = timeStamp;
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);
});
