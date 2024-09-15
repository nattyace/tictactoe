document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const nameEntryPage = document.getElementById('name-entry-page');
    const gameContent = document.getElementById('game-content');
    const startGameButton = document.getElementById('startGame');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');

    // Show name entry page after splash screen
    setTimeout(() => {
        splashScreen.classList.add('slide-out'); 
        setTimeout(() => {
            splashScreen.style.display = 'none';
            nameEntryPage.style.display = 'flex';
        }, 1000); // Match the duration of the slide-out transition
    }, 3000); // Adjust the delay as needed

    // Handle the start game button click
    startGameButton.addEventListener('click', () => {
        const player1Name = player1Input.value.trim();
        const player2Name = player2Input.value.trim();

        if (!player1Name || !player2Name) {
            alert('Please enter names for both players.');
            return;
        }

        nameEntryPage.style.display = 'none';
        gameContent.style.display = 'flex';
        initializeGame(player1Name, player2Name);
    });
});

function initializeGame(player1Name, player2Name) {
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restartButton');
    const message = document.getElementById('message');
    const turnIndicator = document.getElementById('turn');

    let currentPlayer = 'x';
    let isGameActive = true;
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const updateTurnIndicator = () => {
        const playerName = currentPlayer === 'x' ? player1Name : player2Name;
        turnIndicator.textContent = `${playerName}'s Turn`;
    };

    const handleClick = (e) => {
        const cell = e.target;
        if (!isGameActive || cell.textContent !== '') {
            return;
        }
        const playerName = currentPlayer === 'x' ? player1Name : player2Name;
        cell.textContent = currentPlayer.toUpperCase();
        cell.classList.add(currentPlayer);
        if (checkWin()) {
            message.textContent = `${playerName} Wins!`;
            isGameActive = false;
            playSound('sound-test.mp3');
            return;
        }
        if (Array.from(cells).every(cell => cell.textContent !== '')) {
            message.textContent = 'Draw!';
            isGameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        updateTurnIndicator();
    };

    const checkWin = () => {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentPlayer);
            });
        });
    };

    const playSound = (file) => {
        const audio = new Audio(file);
        audio.play();
    };

    const restartGame = () => {
        cells.forEach(cell => {
            cell.classList.remove('x', 'o');
            cell.textContent = '';
        });
        message.textContent = '';
        currentPlayer = 'x';
        isGameActive = true;
        updateTurnIndicator();
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', restartGame);
    updateTurnIndicator();
}
