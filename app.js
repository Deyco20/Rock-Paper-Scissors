// app.js

// 1. Variables de Puntuación y Límite
let playerScore = 0;
let computerScore = 0;
const MAX_SCORE = 3; 

// 2. Referencias a los elementos del DOM
const buttons = document.querySelectorAll('#user-options button');
const yourChoiceText = document.getElementById('your-choice');
const computerChoiceText = document.getElementById('computer-choice');
const resultMessage = document.getElementById('result-message');
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const playAgainButton = document.getElementById('play-again'); // Botón de reinicio

// 3. Configuración de Event Listeners
buttons.forEach(button => {
    // Listener principal para las jugadas (Rock, Paper, Scissors)
    button.addEventListener('click', (e) => {
        const userChoice = e.target.id;
        playRound(userChoice);
    });
});

// Listener para el botón de reinicio (Debe estar aquí, fuera del bucle de juego)
playAgainButton.addEventListener('click', resetGame);


// 4. Función para que la computadora elija aleatoriamente
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3); 
    return options[randomIndex];
}

// 5. Función principal para jugar una ronda
function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    let result = '';

    // Actualizar DOM con las elecciones
    yourChoiceText.textContent = `Your Choice: ${userChoice.toUpperCase()}`;
    computerChoiceText.textContent = `Computer's Choice: ${computerChoice.toUpperCase()}`;

    // Lógica de Comparación
    if (userChoice === computerChoice) {
        result = 'It\'s a TIE!';
        updateScore(0); 
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'YOU WIN!';
        updateScore(1); 
    } else {
        result = 'YOU LOSE!';
        updateScore(-1); 
    }

    // Mostrar el resultado de la ronda
    displayResult(result);
}

// 6. Función para actualizar la puntuación y verificar el final del juego
function updateScore(winner) {
    if (winner === 1) {
        playerScore++;
    } else if (winner === -1) {
        computerScore++;
    }
    
    // Actualizar el marcador en el DOM
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;

    // Verifica si alguien alcanzó el límite
    checkGameOver(); 
}

// 7. Función para verificar si la partida ha terminado
function checkGameOver() {
    let finalWinner = '';

    if (playerScore === MAX_SCORE) {
        finalWinner = 'Player';
    } else if (computerScore === MAX_SCORE) {
        finalWinner = 'Computer';
    }

    if (finalWinner) {
        // Mostrar el mensaje final de la partida
        resultMessage.textContent = `${finalWinner.toUpperCase()} WINS THE MATCH!`;
        resultMessage.style.color = 'gold'; 
        
        // Desactivar los botones
        buttons.forEach(button => {
            button.disabled = true;
        });
        
        // Mostrar el botón de "Play Again"
        playAgainButton.style.display = 'block';

        // Disparar confeti solo si gana el jugador
        if (finalWinner === 'Player') {
            launchConfetti(); 
        }
    }
}

// 8. Función para mostrar el mensaje y su estilo
function displayResult(result) {
    // No sobrescribir el mensaje de victoria final
    if (playerScore === MAX_SCORE || computerScore === MAX_SCORE) {
        return; 
    }
    
    resultMessage.textContent = result;
    
    // Cambiar color basado en el resultado
    if (result === 'YOU WIN!') {
        resultMessage.style.color = '#4CAF50'; 
    } else if (result === 'YOU LOSE!') {
        resultMessage.style.color = '#F44336'; 
    } else {
        resultMessage.style.color = '#2196F3'; 
    }
}

// 9. Función para Disparar Confeti (¡Movida al lugar correcto!)
function launchConfetti() {
    // Verifica que la librería 'confetti' esté cargada
    if (typeof confetti !== 'undefined') { 
        confetti({
            particleCount: 150, 
            spread: 120,       
            origin: { y: 0.6 }
        });
    }
}

// 10. Función para reiniciar el juego
function resetGame() {
    // 1. Resetear puntuaciones
    playerScore = 0;
    computerScore = 0;
    playerScoreSpan.textContent = 0;
    computerScoreSpan.textContent = 0;

    // 2. Limpiar mensajes de ronda y resultado
    resultMessage.textContent = 'Choose your move to start!';
    resultMessage.style.color = '#e4e4e4'; 
    yourChoiceText.textContent = 'Your Choice:';
    computerChoiceText.textContent = "Computer's Choice:";

    // 3. Ocultar el botón de "Play Again" y reactivar los botones de juego
    playAgainButton.style.display = 'none';
    buttons.forEach(button => {
        button.disabled = false;
    });
}