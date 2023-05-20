let firstCardRevealed = null;
let twoCards = [];
let flips = 0;



const gameStart = () => {
    let count = 100;
    
    showCard();
    const interval = setInterval(() => {
        timeRemaining.innerText = count;
        gameOver(count, interval);
        count--;
    }, 1000);
};

function gameOver(time, intervalID) {
    if (time <= 0) {
        clearInterval(intervalID);
        setTimeout(() => {
            addVisibility(gameOverLay);
        }, 0);
    }
}

function addVisibility(element) {
    element.classList.add("visible");
}
function removeVisibility(element) {
    element.classList.remove("visible");
}



function showCard() {
    allCards.forEach((card) => {
        card.addEventListener("click", () => {
            addVisibility(card);
            getImgValue(card)
            addFlip()
        });
    });
}

function addFlip(){
    flips++
    flipCount.innerText = flips;
}

function getImgValue(element) {
    twoCards.push(element);
    const imgCard = element.querySelector(".card-front .card-value");
    const cardValue = imgCard.getAttribute("src");

    if (firstCardRevealed === null) {
        
        console.log("primer vuelta")
        firstCardRevealed = cardValue
        
    }
    else {
        if (firstCardRevealed === cardValue) {
           console.log("punto")
            twoCards=[]
        }

        else {
            setTimeout(() => {
                twoCards.forEach((cardChild) => {
                    const parentCard = cardChild.closest(".card");
                    removeVisibility(parentCard);
                });
                twoCards = [];
            }, 1000)
            


        }
        firstCardRevealed = null
    }

}





function restart() {
    removeVisibility(gameOverLay);
    timeRemaining.innerText = 100;
    gameStart();
}
