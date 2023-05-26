

const overlayText = document.querySelector(".overlay-text");
const gameOverLay = document.getElementById("gameover-text");
const victoryLay = document.getElementById("victory-text")
const restartButton = document.querySelectorAll(".overlay-text-small")
const timeRemaining = document.getElementById("time-remaining");
const allCards = document.querySelectorAll(".card");
const cardsArray = Array.from(allCards)
const cardsValues = document.querySelectorAll(".card-value")
const flipCount = document.getElementById("flips")

//obtengo los valores src de cada carta para despues poder mezclar
let imgValueArray = cardsArray.map((card)=>{
    const imgCard = card.querySelector(".card-front .card-value");
    const cardValue = imgCard.getAttribute("src");
    return cardValue
})



overlayText.addEventListener("click", () => {
    gameStart()
    removeVisibility(overlayText);
    setGame();
    

})












