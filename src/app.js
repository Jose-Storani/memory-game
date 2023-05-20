const overlayText = document.querySelector(".overlay-text");
const gameOverLay = document.getElementById("gameover-text");
const restartButton = document.querySelector(".overlay-text-small")
const timeRemaining = document.getElementById("time-remaining");
const allCards = document.querySelectorAll(".card");
const cardsValues = document.querySelectorAll(".card-value")
const flipCount = document.getElementById("flips")





overlayText.addEventListener("click", () => {
    removeVisibility(overlayText);
    gameStart()

})


restartButton.addEventListener("click", () => {
    restart()
})










