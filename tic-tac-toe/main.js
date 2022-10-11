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
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let positionResidue = [...Array(9).keys()];
  let gameEnd = false;

  const gameCells = document.querySelectorAll(".grid-item");
  const displayController = (reset = false) => {
    // console.log(`drawing on board with ${gameBoard}`);
    gameBoard.map((item, index) => {
      const gameCell = gameCells[index];
      if (gameCell.innerText === "") {
        // prevent duplicate child write
        const insertCell = document.createTextNode(item);
        gameCell.appendChild(insertCell);
      } else if (reset) {
        gameCell.innerText = "";
      }
    });
  };

  const resetGameBoard = function () {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    positionResidue = [...Array(9).keys()];
    this.gameEnd = false;
    displayController(true);
  };

  const getPositionResidue = () => positionResidue;

  const updateGameBoard = (playPosition, tool) => {
    gameBoard[playPosition] = tool;
    positionResidue = positionResidue.filter((cell) => {
      // update game position residue
      return cell !== playPosition;
    });
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

  return {
    updateGameBoard,
    resetGameBoard,
    getPositionResidue,
    getWinningCombinations,
    displayController,
    gameEnd,
  };
})();

const Player = (tool, name = "player") => {
  let playHistory = [];
  const getTool = () => tool; // O or X
  const getPlayHistory = () => playHistory;
  const resetPlayHistory = () => (playHistory = []);

  const updateBoard = (playPosition) => {
    playHistory.push(playPosition);
    game.updateGameBoard(playPosition, tool);
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
        return win();
      }
    }
    if (game.getPositionResidue().length == 0) {
      return draw();
    }
  };

  const playGame = () => {
    return new Promise(function play(resolve) {
      if (game.gameEnd) return resolve();
      if (name === "computer") {
        setTimeout(() => {
          const playPosition =
            game.getPositionResidue()[
              Math.floor(Math.random() * game.getPositionResidue().length)
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
              game
                .getPositionResidue()
                .includes(+e.target.id.replace(/^\D+/g, ""))
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
    document.getElementById(
      "show-result"
    ).innerHTML = `<h1>${name} wins the game!</h1>`;
    console.log(`${name} wins the game!`);
  };

  const draw = () => {
    game.gameEnd = true;
    document.getElementById("show-result").innerHTML = `<h1>It's a draw!</h1>`;
    console.log(`It's a draw!`);
  };

  return { getTool, getPlayHistory, resetPlayHistory, playGame };
};

const Controller = () => {
  const player = Player("O", "player");
  const computer = Player("X", "computer");

  const startGame = async () => {
    while (game.getPositionResidue().length > 0 && !game.gameEnd) {
      await player.playGame();
      await computer.playGame();
      console.log(`player history ${player.getPlayHistory()}`);
      console.log(`computer history ${computer.getPlayHistory()}`);
    }
    console.log("game over!");
  };

  document.getElementById("reset").addEventListener("click", () => {
    console.log("clicked reset!");
    game.resetGameBoard();
    player.resetPlayHistory();
    computer.resetPlayHistory();
    document.getElementById("show-result").innerHTML = "";
    startGame();
  });

  return { startGame };
};

const control = Controller();
control.startGame();
