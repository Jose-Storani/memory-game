const overlayText = document.querySelector(".overlay-text");
const gameOverLay = document.getElementById("gameover-text");
const restartButton = document.querySelector(".overlay-text-small")
overlayText.addEventListener("click",()=>{
    overlayText.classList.remove("visible");
    gameStart()

})


const gameStart = () => {
    const timeRemaining = document.getElementById("time-remaining");
    let count = 5;
  
    const interval = setInterval(() => {
      timeRemaining.innerText = count;
  
      gameOver(count,interval)
  
      count--;
    }, 1000);
  }
  
  
  
function gameOver(time,intervalID){
    if(time <= 0){
        clearInterval(intervalID)
        setTimeout(() => {
            gameOverLay.classList.add("visible");
          }, 0);
    }
}

function restart(){
    gameOverLay.classList.remove("visible");
    gameStart()
}


restartButton.addEventListener("click",()=>{
    restart()
})