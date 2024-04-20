let currentPlayer = "❌";
let computerPlayer = "🟢";
let humanPlayer = "❌";
let moves = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let btns = document.querySelectorAll(".a");
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const x = parseInt(btn.getAttribute("id"));
    cellClick(x);
  });
});

// Function to handle click event on cells
function cellClick(index) {
  if (!gameOver && moves[index] === "") {
    moves[index] = currentPlayer;
    document.getElementById(`${index}`).innerText = currentPlayer;
    document.getElementById(`${index}`).style.opacity = "100%";
    document.getElementById(`${index}`).style.fontSize = "25px";
    if (checkWin(currentPlayer)) {
        if(currentPlayer==='❌')
        {
            document.getElementById("res").innerText = `You Win🤩`;
        }
        else{
            document.getElementById("res").innerText = `You Lose😢`;
            document.getElementById("result").style.backgroundColor = "red";
        }
        document.getElementById("result").style.display = "flex";
        document.getElementById("restart").style.display = "flex";
        gameOver = true;
    } else if (checkDraw()) {
        document.getElementById("res").innerText = "It's a draw🫤";
        document.getElementById("result").style.display = "flex";
        document.getElementById("result").style.backgroundColor = "#adada5";
        document.getElementById("restart").style.display = "flex";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === humanPlayer ? computerPlayer : humanPlayer;
        if (currentPlayer === computerPlayer) {
            computerMove();
        }
    }
  }
}
// let dep = prompt("Enter the difficulty Level:")
let dep=4;
function computerMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < moves.length; i++) {
        if (moves[i] === "") {
            moves[i] = computerPlayer;
            let score = minimax(moves, 0, false, dep); // Adjust depth limit here
            moves[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    cellClick(move);
}

function minimax(board, depth, isMaximizing, maxDepth) {
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (depth >= maxDepth) { // Check if depth limit is reached
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = computerPlayer;
                let score = minimax(board, depth + 1, false, maxDepth);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = humanPlayer;
                let score = minimax(board, depth + 1, true, maxDepth);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

const scores = {
    "❌": -1,
    "🟢": 1,
    "draw": 0
};

// Check for a winner
function checkWinner() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
            return moves[a];
        }
    }

    if (moves.every(cell => cell !== "")) {
        return "draw";
    }

    return null;
}

document.getElementById("restart").addEventListener("click", () => {
    window.location.reload();
});

function checkWin(player) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winCombos.some(combo => {
        return combo.every(index => moves[index] === player);
    });
}

function checkDraw() {
    return !moves.includes("");
}