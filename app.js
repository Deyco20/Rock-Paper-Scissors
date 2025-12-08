// app.js

// 1. Score variables
let playerScore = 0;
let computerScore = 0;

// 2. DOM elements references
const buttons = document.querySelectorAll('#user-options button');
const yourChoiceText = document.getElementById('your-choice');
const computerChoiceText = document.getElementById('computer-choice');
const resultMessage = document.getElementById('result-message');

const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');

// 3. Event Listeners setup
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const userChoice = e.target.id; // 'rock', 'paper', or 'scissors'
        playRound(userChoice);
    });
});

// 4. Computer's random choice function
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    // Generate a random index: 0, 1, or 2
    const randomIndex = Math.floor(Math.random() * 3); 
    return options[randomIndex];
}

// 5. Main game logic function
function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    let result = '';

    // Update DOM with choices
    yourChoiceText.textContent = `Your Choice: ${userChoice.toUpperCase()}`;
    computerChoiceText.textContent = `Computer's Choice: ${computerChoice.toUpperCase()}`;

    // Comparison logic
    if (userChoice === computerChoice) {
        result = 'It\'s a TIE!';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'YOU WIN!';
        updateScore(1); // Player wins
    } else {
        result = 'YOU LOSE!';
        updateScore(-1); // Computer wins
    }

    // Display the final result
    displayResult(result);
}

// 6. Function to update the score
function updateScore(winner) {
    if (winner === 1) {
        playerScore++;
    } else if (winner === -1) {
        computerScore++;
    }
    
    // Update score board in the DOM
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
}

// 7. Function to display the message and style
function displayResult(result) {
    resultMessage.textContent = result;
    
    // Change color based on result
    if (result === 'YOU WIN!') {
        resultMessage.style.color = '#4CAF50'; // Green
    } else if (result === 'YOU LOSE!') {
        resultMessage.style.color = '#F44336'; // Red
    } else {
        resultMessage.style.color = '#2196F3'; // Blue
    }
}