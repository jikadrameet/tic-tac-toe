let board = ['', '', '', '', '', '', '', '', ''];  
let turn = 'x'; 
let gameOver = false; 


const cells = document.querySelectorAll('.value');
const status = document.querySelector('.para');
const restartButton = document.querySelector('.restart');


const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]              
];
function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      setTimeout(() => {
        status.textContent = `Player ${board[a].toUpperCase()} wins!`;
      }, 100);
      return;
    }
  }

  if (!board.includes('')) {
    gameOver = true;
    setTimeout(() => {
      status.textContent = "It's a draw!";
    }, 100);
  }
}


function handleMove(index) {
  if (board[index] === '' && !gameOver) {
    board[index] = turn;  
    cells[index].textContent = turn.toUpperCase();
    cells[index].classList.add(turn);  
    checkWinner();

    if (!gameOver) {
      turn = (turn === 'x') ? 'o' : 'x';  // Switch player
      status.textContent = `Player ${turn.toUpperCase()}'s turn`;
    }
  }
}
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];  
  turn = 'x';  
  gameOver = false;  

  cells.forEach(cell => {
    cell.textContent = ''; 
    cell.classList.remove('x', 'o');  
  });

  status.textContent = "Player X's turn"; 
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleMove(index));
});


restartButton.addEventListener('click', restartGame);

