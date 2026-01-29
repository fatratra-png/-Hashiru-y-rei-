const ghost = document.getElementById("ghost");
const bomb = document.getElementById("bomb");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");

let score = 0;
let speed = 5;
let jumping = false;
let playing = true;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !jumping) {
    jump();
  }
});

function jump() {
  jumping = true;
  ghost.classList.add("jump");

  setTimeout(() => {
    ghost.classList.remove("jump");
    jumping = false;
  }, 500);
}

function gameLoop() {
  if (!playing) return;

  let bombRight = parseInt(
    window.getComputedStyle(bomb).getPropertyValue("right"),
  );

  bomb.style.right = bombRight + speed + "px";

  let ghostBottom = parseInt(
    window.getComputedStyle(ghost).getPropertyValue("bottom"),
  );


  if (bombRight > 680 && bombRight < 740 && ghostBottom < 40) {
    endGame();
  }


  if (bombRight > 860) {
    bomb.style.right = "-60px";
    score++;
    speed += 0.3;
    scoreText.textContent = "Score : " + score;
  }

  requestAnimationFrame(gameLoop);
}

function endGame() {
  playing = false;
  gameOverScreen.style.display = "block";
}

function restart() {
  score = 0;
  speed = 5;
  bomb.style.right = "-60px";
  scoreText.textContent = "Score : 0";
  gameOverScreen.style.display = "none";
  playing = true;
  gameLoop();
}

gameLoop();
