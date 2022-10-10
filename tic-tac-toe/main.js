// let turnSwitch = false;
// const playOptions = ["X", "O"];
// const playCats = ["./img/blackcat.svg", "./img/whitecat.svg"];

// document.addEventListener("click", function (e) {
//   if (e.target.id) {
//     const gridElement = document.querySelector(`#${e.target.id}`);
//     if (!gridElement.classList.contains("checked")) {
//       gridElement.style.backgroundImage = `url(${playCats[+turnSwitch]})`;
//       gridElement.classList.add("checked");
//       turnSwitch = !turnSwitch;
//       console.log(gridElement);
//     }
//   }
// });

// object and methods to initialize and display gameBoard
const game = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const positionResidue = [...Array(9).keys()];
  const gameEnd = false;
  // const playHistory = [];

  const setGameBoard = (playPosition, tool) => {
    gameBoard[playPosition] = tool;
  };

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getWinningCombinations = () => winningCombinations;

  const gameCells = document.querySelectorAll(".grid-item");
  const displayController = () => {
    gameBoard.map((item, index) => {
      const gameCell = gameCells[index];
      if (gameCell.innerText === "") {
        // prevent duplicate child write
        const insertCell = document.createTextNode(item);
        gameCell.appendChild(insertCell);
      }
    });
  };

  return {
    setGameBoard,
    positionResidue,
    gameEnd,
    getWinningCombinations,
    displayController,
  };
})();

const Player = (tool, name = "player") => {
  const playHistory = [];
  const getName = () => name;
  const getTool = () => tool; // O or X
  const getPlayHistory = () => playHistory;

  const updateBoard = (playPosition) => {
    game.setGameBoard(playPosition, tool);
    playHistory.push(playPosition);
    game.positionResidue = game.positionResidue.filter((cell) => {
      // update game position residue
      return cell !== playPosition;
    });
    game.displayController();
    checkWin();
  };

  const checkWin = () => {
    for (combination of game.getWinningCombinations()) {
      const intersection = playHistory.filter((element) =>
        combination.includes(element)
      );
      if (intersection.length === 3) {
        // console.log(intersection);
        win();
      }
    }
  };

  const playGame = () => {
    return new Promise(function play(resolve) {
      if (game.gameEnd) return resolve();
      if (name === "computer") {
        setTimeout(() => {
          const playPosition =
            game.positionResidue[
              Math.floor(Math.random() * game.positionResidue.length)
            ];
          updateBoard(playPosition);
          resolve();
        }, 500);
      } else if (name == "player") {
        // wait for user input!
        const grid = document.getElementById("game-grid");
        grid.addEventListener(
          "click",
          (e) => {
            if (
              e.target.id &&
              game.positionResidue.includes(+e.target.id.replace(/^\D+/g, ""))
            ) {
              const playPosition = +e.target.id.replace(/^\D+/g, "");
              updateBoard(playPosition);
              resolve();
            } else {
              play(resolve);
            }
          },
          { once: true }
        );
      }
    });
  };

  const win = () => {
    game.gameEnd = true;
    console.log(`${name} wins the game!`);
  };

  return { getName, getTool, getPlayHistory, playGame };
};

const Controller = () => {
  const startGame = async () => {
    const player = Player("O", "player");
    const computer = Player("X", "computer");
    while (game.positionResidue.length > 1 && !game.gameEnd) {
      await player.playGame();
      await computer.playGame();
      console.log(`player history ${player.getPlayHistory()}`);
      console.log(`computer history ${computer.getPlayHistory()}`);
    }
  };

  return { startGame };
};

const control = Controller();
control.startGame();
