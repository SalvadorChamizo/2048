const gridContainer = document.getElementById("grid-container");

const restartButton = document.getElementById("restart-btn");

let score = 0;
let finish = false;

const scoreElement = document.getElementById("score");

function updateScore(value) {
    score = score + value;
    scoreElement.textContent = score;
}

restartButton.addEventListener("click", () => {
    scoreElement.textContent = 0;
    finish = false;
    cleanGame();
    startGame();
})

function generateNewRandom() {
    const position = getRandomPosition("");
    for (let i = 0; i < gridContainer.children.length; ++i) {
        if (i === position) {
            if (gridContainer.children[i].textContent === "")
                gridContainer.children[i].textContent = getRandomInit();
            else {
                generateNewRandom();
                break ;
            }
        }
    }
}

function cleanGame() {
    for (let i = 0; i < gridContainer.children.length; ++i) {
        gridContainer.children[i].textContent = "";
    }
}

function startGame() {
    const firstPos = getRandomPosition("");
    const secondPos = getRandomPosition(firstPos);
    
    for (let i = 0; i < gridContainer.children.length; ++i) {
        if (i === firstPos)
            gridContainer.children[i].textContent = getRandomInit();
        if (i === secondPos)
            gridContainer.children[i].textContent = getRandomInit();
    }
}

function checkWinCondition() {
    for (let i = 0; i < gridContainer.children.length; i++) {
        if (gridContainer.children[i].textContent === '2048') {
            return true;
        }
    }
    return false;
}

function moveAndMerge(line) {
    let newLine = line.filter(val => val !== 0);

    for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] === newLine[i + 1]) {
            newLine[i] = newLine[i] * 2;
            updateScore(newLine[i]);
            newLine[i + 1] = 0;
        }
    }
    
    if (checkWinCondition()) {
        document.getElementById("win-message").style.display = "block";
        finish = true;
    }
    newLine = newLine.filter(val => val !== 0);

    while (newLine.length < 4) {
        newLine.push(0);
    }

    return newLine;
}

function movementUp() {
    for (let col = 0; col < 4; col++) {
        let line = [];

        for (let row = 0; row < 4; row++) {
            const index = row * 4 + col;
            const value = parseInt(gridContainer.children[index].textContent) || 0;
            line.push(value);
        }

        line = moveAndMerge(line);

        for (let row = 0; row < 4; row++) {
            const index = row * 4 + col;
            gridContainer.children[index].textContent = line[row] === 0 ? "" : line[row];
        }
    }
}

function movementRight() {
    for (let row = 0; row < 4; row++) {
        let line = [];

        for (let col = 3; col >= 0; col--) {
            const index = row * 4 + col;
            const value = parseInt(gridContainer.children[index].textContent) || 0;
            line.push(value);
        }

        line = moveAndMerge(line);

        for (let col = 3, i = 0; col >= 0; col--, i++) {
            const index = row * 4 + col;
            gridContainer.children[index].textContent = line[i] === 0 ? "" : line[i];
        }
    }
}

function movementLeft() {
    for (let row = 0; row < 4; row++) {
        let line = [];

        for (let col = 0; col < 4; col++) {
            const index = row * 4 + col;
            const value = parseInt(gridContainer.children[index].textContent) || 0;
            line.push(value);
        }

        line = moveAndMerge(line);

        for (let col = 0; col < 4; col++) {
            const index = row * 4 + col;
            gridContainer.children[index].textContent = line[col] === 0 ? "" : line[col];
        }
    }
}

function movementDown() {
    for (let col = 0; col < 4; col++) {
        let line = [];
        for (let row = 3; row >= 0; row--) {
            const index = row * 4 + col;
            const value = parseInt(gridContainer.children[index].textContent) || 0;
            line.push(value);
        }

        line = moveAndMerge(line);

        for (let row = 3, i = 0; row >= 0; row--, i++) {
            const index = row * 4 + col;
            gridContainer.children[index].textContent = line[i] === 0 ? "" : line[i];
        }
    }
}

document.addEventListener('keydown', (event) => {
    if (finish)
        return ;
    if (event.key == "ArrowUp") {
        movementUp();
    }
    else if (event.key == "ArrowDown") {
        movementDown();
    }
    else if (event.key == "ArrowLeft") {
        movementLeft();
    }
    else if (event.key == "ArrowRight") {
        movementRight();
    }
    generateNewRandom();
})

startGame();

function getRandomInit() {
    let number = Math.floor((Math.random() * 4) + 1);
    if (number === 1)
        return 2;
    else if (number === 3)
        return 4;
    else
        return number;
}

function getRandomPosition(previous) {
    let number = Math.floor((Math.random() * 15));
    if (previous && number === previous)
        number = getRandomPosition(number);
    return number;
}