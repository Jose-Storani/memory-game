
//values from DOM
const startButton = document.querySelector(".overlay-text");
const gameOverLay = document.getElementById("gameover-text");
const victoryLay = document.getElementById("victory-text")
const restartButton = document.querySelectorAll(".overlay-text-small")
const timeRemaining = document.getElementById("time-remaining");
const cardsArray = Array.from(document.querySelectorAll(".card"))
const cardsValues = Array.from(document.querySelectorAll(".card-value")).map((value)=>{ 
    return value.getAttribute("src")
})
const flipCount = document.getElementById("flips")


//values for functions
let firstCardRevealed = null;
let revealedCards = [];
let correctRevealedCards = [];
const GAME_DURATION = 99;
let flips = 0;
const backgroundMusic = new Audio("./Assets/audios/Assets_Audio_creepy.mp3");
backgroundMusic.volume = 0.5
const flipSound = new Audio("./Assets/audios/Assets_Audio_flip.wav");
const gameOverSound = new Audio("./Assets/audios/Assets_Audio_gameOver.wav");
const matchCardSound = new Audio("./Assets/audios/Assets_Audio_match.wav")
const victorySound = new Audio("./Assets/audios/Assets_Audio_victory.wav")
backgroundMusic.loop = true;


startButton.addEventListener("click", () => {
    gameStart()
    removeVisibility(startButton);
    setGame();
})



const gameStart = () => {
    let count = GAME_DURATION;
    const interval = setInterval(() => {
        timeRemaining.innerText = count;
        gameOver(count, interval);
        count--;
    }, 1000);
    backgroundMusic.play()
    
    showCard();
    
};

function setGame() {
    const shuffledCards = shuffleCards(cardsValues);
    cardsArray.forEach((card, index) => {
        const imgCard = card.querySelector(".card-front .card-value");
        imgCard.setAttribute("src", shuffledCards[index]);
    });
}


function gameOver(time, intervalID) {
    if(correctRevealedCards.length === 16){
        clearInterval(intervalID);
        addVisibility(victoryLay);
        victorySound.play()
        
    }
    if (time <= 0) {
        clearInterval(intervalID);
        gameOverSound.play()
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
    cardsArray.forEach((card) => {
        card.addEventListener("click", () => {
            addVisibility(card);
            checkCardValue(card);
            
            
        });
    });
}

function addFlip() {
    flips++;
    flipCount.innerText = flips;
}

function checkCardValue(element) {
    flipSound.play()
    addFlip()
    element.style.pointerEvents = "none"
    revealedCards.push(element);
    if (revealedCards.length === 2) {
        clickState();
    }
    const imgCard = element.querySelector(".card-front .card-value");
    const cardValue = imgCard.getAttribute("src");

    if (firstCardRevealed === null) {
        firstCardRevealed = cardValue;
    } else {
        if (firstCardRevealed === cardValue) {
            clickState("enable");
            correctRevealedCards.splice(correctRevealedCards.length,0,firstCardRevealed,cardValue);
            matchCardSound.play();
            revealedCards = [];
        } else {
            setTimeout(() => {
                revealedCards.forEach((cardChild) => {
                    const parentCard = cardChild.closest(".card");
                    removeVisibility(parentCard);
                });
                clickState("enable");
                revealedCards = [];
            }, 1000);
        }
        firstCardRevealed = null;
    }
}

function restart(lay) {
    removeVisibility(lay);
    timeRemaining.innerText = 100;
    flipAllCards();
    gameStart();
}

function clickState(state) {
    if (state === "enable") {
        cardsArray.forEach((card) => {
            card.style.pointerEvents = "auto";
        });
    } else {
        cardsArray.forEach((card) => {
            card.style.pointerEvents = "none";
        });
    }
}

function flipAllCards() {
    cardsArray.forEach((card) => {
        removeVisibility(card);
    });
}

function shuffleCards(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        const tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
    }

    return array;
}



