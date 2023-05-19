const overlayText = document.querySelector(".overlay-text")
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
            alert("Game Over");
          }, 0);
    }
}

