// variables

let win;
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let noise = true;
let on = false;
let strict = false;
// selectores
const inputOn = document.getElementById("on");
const start = document.getElementById("start");
const inputStrict = document.getElementById("strict");
const display = document.getElementById("display");
// btns game color
const topleft = document.getElementById("topleft");
const topright = document.getElementById("topright");
const bottomleft = document.getElementById("bottomleft");
const bottomright = document.getElementById("bottomright");

// btns start on and stict
inputOn.addEventListener("click", () => {
    if (inputOn.checked) {
        on = true;
        display.innerText = "-";
    } else {
        on = false;
        display.innerText = "";
    }
    clearColor();
    clearInterval(intervalId);
});
inputStrict.addEventListener("click", () => {
    if (inputStrict.checked) {
        strict = true;
    } else {
        strict = false;
    }
});

start.addEventListener("click", () => {
    if (on || win) {
        play();
    }
});
// end start on and stict
const play = () => {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    display.innerHTML = 1;
    good = true;
    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
    intervalId = setInterval(gameDisplay, 800);
};

const gameDisplay = () => {
    on = false;
    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
};
// audio
function one() {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    topleft.style.backgroundColor = "lightgreen";
}
function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topright.style.backgroundColor = "tomato";
}
function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomleft.style.backgroundColor = "yellow";
}
function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomright.style.backgroundColor = "lightskyblue";
}
// end audio
// change colors
const clearColor = () => {
    topleft.style.backgroundColor = "darkgreen";
    topright.style.backgroundColor = "darkred";
    bottomleft.style.backgroundColor = "goldenrod";
    bottomright.style.backgroundColor = "darkblue";
};
const flashColor = () => {
    topleft.style.backgroundColor = "lightgreen";
    topright.style.backgroundColor = "tomato";
    bottomleft.style.backgroundColor = "yellow";
    bottomright.style.backgroundColor = "lightskyblue";
};
// end change colors

topleft.addEventListener("click", () => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topright.addEventListener("click", () => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomleft.addEventListener("click", () => {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomright.addEventListener("click", () => {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) good = false;

    if (playerOrder.length == 10 && good) {
        winGame();
    }

    if (good == false) {
        flashColor();
        display.innerHTML = "NO!";
        setTimeout(() => {
            display.innerHTML = turn;
            clearColor();

            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameDisplay, 800);
            }
        }, 800);

        noise = false;
    }

    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        display.innerHTML = turn;
        intervalId = setInterval(gameDisplay, 800);
    }
}

// win game
function winGame() {
    flashColor();
    display.innerHTML = "WIN!";
    on = false;
    win = true;
}
// end win game
