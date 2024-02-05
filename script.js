let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';
let gameOver = false;

// Initializes the game
function initGame() {
    document.getElementById('playAgain').addEventListener('click', resetGame);
    // Bind the click event for each cell to make a move
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', function() {
            const row = this.getAttribute('data-row');
            const col = this.getAttribute('data-col');
            makeMove(this, row, col);
        });
    });
}

function makeMove(cell, row, col) {
    if (board[row][col] || gameOver) {
        return;
    }
    board[row][col] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWin()) {
        document.getElementById('status').innerText = currentPlayer + " wins!";
        gameOver = true;
    } else if (checkTie()) {
        document.getElementById('status').innerText = "It's a tie!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    if (gameOver) {
        document.getElementById('playAgain').style.display = 'block';
    }
}

function checkWin() {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            return true;
        }
        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            return true;
        }
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return true;
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return true;
    }
    return false;
}

function checkTie() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('status').innerText = '';
    document.getElementById('playAgain').style.display = 'none';
    
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
    });
}

// Call initGame to set up the game initially
window.onload = initGame;
