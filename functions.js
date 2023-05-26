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


const gameStart = () => {
    let count = GAME_DURATION;
    const interval = setInterval(() => {
        timeRemaining.innerText = count;
        gameOver(count, interval);
        count--;
    }, 1000);
    backgroundMusic.play();
    showCard();
    
};

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
            flipSound.play()
            addVisibility(card);
            checkCardValue(card);
            addFlip();
        });
    });
}

function addFlip() {
    flips++;
    flipCount.innerText = flips;
}

function checkCardValue(element) {
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
            matchCardSound.play()
            correctRevealedCards.splice(correctRevealedCards.length,0,firstCardRevealed,cardValue)
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

function setGame() {
    const shuffledCards = shuffleCards(imgValueArray);
    cardsArray.forEach((card, index) => {
        const imgCard = card.querySelector(".card-front .card-value");
        imgCard.setAttribute("src", shuffledCards[index]);
    });
}


