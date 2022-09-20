const getComputerChoice = () => {
    let choices = ["rock", "paper", "scissors"];
    let randomIdx = Math.floor(Math.random() * choices.length);
    return choices[randomIdx];
};

const winnerBoard = {
    rock: {
        rock: 0, paper: 2, scissors: 1
    },
    paper: {
        rock: 1, paper: 0, scissors: 2
    },
    scissors: {
        rock: 2, paper: 1, scissors: 0
    }
};

let playerScore = 0;
let computerScore = 0;

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const playRound = (playerSelection, computerSelection) => {
    let result = winnerBoard[playerSelection][computerSelection]
    if (result == 0) {
        return 'Tie!';
    } else if (result == 1) {
        playerScore += 1;
        return `You Win! ${capitalizeFirstLetter(playerSelection)} beats ${capitalizeFirstLetter(computerSelection)}`;
    } else {
        computerScore += 1;
        return `You Lose! ${capitalizeFirstLetter(computerSelection)} beats ${capitalizeFirstLetter(playerSelection)}`;
    }
};

// for (let i = 0; i < 5; i++) {
//     let playerSelection = prompt("Choose a valid choice between rock, paper and scissors.")
//     if (['rock', 'paper', 'scissor'].includes(playerSelection)) {
//         let computerSelection = getComputerChoice();
//         console.log(playRound(playerSelection, computerSelection));
//     } else {
//         i--;
//         continue;
//     }
// }

const buttons = document.querySelectorAll('button');
const result = document.querySelector("#result");
const playerScoreboard = document.querySelector("#player-score");
const computerScoreboard = document.querySelector("#computer-score");
let gameOver = false;

for (let button of buttons) {
    button.addEventListener('click', (e) => {
        if (!gameOver) {
            result.innerText = playRound(e.target.id, getComputerChoice())
            playerScoreboard.innerText = playerScore
            computerScoreboard.innerText = computerScore

            if (playerScore == 5 || computerScore == 5) {
                gameOver = true;
                if (playerScore == 5) {
                    result.innerText = "GAME OVER! Player Wins.";
                } else {
                    result.innerText = "GAME OVER! Computer Wins."
                }
            }
        }
    })
}

