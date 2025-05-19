let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameStatus = document.getElementById('game-status');
const cells = document.querySelectorAll('.cell');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');

function handleCellClick(index) {
    if (gameBoard[index] !== '') return; // Prevent if cell is already taken
    gameBoard[index] = currentPlayer;
    const cell = document.getElementById(`cell-${index}`);
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer); // Add class to distinguish X and O
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerText = `${currentPlayer}'s Turn`; // Update game status
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            animateWinningCells(combo);
            setTimeout(() => {
                gameStatus.innerText = `${gameBoard[a]} Wins!`;
                modalMessage.innerText = `${gameBoard[a]} Wins!`;
                modal.style.display = 'flex';
            }, 1200); // Wait for the animation to finish before showing the winner
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameStatus.innerText = 'It\'s a Draw!';
        modalMessage.innerText = 'It\'s a Draw!';
        modal.style.display = 'flex';
    }
}

function animateWinningCells(combo) {
    combo.forEach(index => {
        const cell = document.getElementById(`cell-${index}`);
        cell.classList.add('strike'); // Apply strike effect to winning cells
    });
    // Optional: Add a line effect to the winning combination
    createWinningLine(combo);
}

function createWinningLine(combo) {
    const line = document.createElement('div');
    line.classList.add('line');
    const isHorizontal = combo[0] === combo[1] || combo[1] === combo[2];
    const isVertical = combo[0] === combo[3] || combo[1] === combo[4];

    if (isHorizontal) {
        const top = (combo[0] < 3) ? '0%' : (combo[0] < 6) ? '50%' : '100%';
        line.style.top = top;
        line.style.display = 'block';
    } else if (isVertical) {
        const left = (combo[0] === 0 || combo[1] === 0 || combo[2] === 0) ? '10%' : '50%';
        line.style.left = left;
        line.style.display = 'block';
    }
    document.querySelector('.board').appendChild(line);
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameStatus.innerText = `${currentPlayer}'s Turn`;
    modal.style.display = 'none';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O', 'strike');
    });
    const lines = document.querySelectorAll('.line');
    lines.forEach(line => line.remove()); // Remove any lines drawn for winning combinations
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});
