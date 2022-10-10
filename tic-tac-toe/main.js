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

// index wins
// 012, 345, 678, 036, 147, 258, 048

// object and methods to initialize and display gameBoard

const game = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const positionResidue = [...Array(9).keys()];
  const gameEnd = false;
  const playHistory = [];

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
    gameBoard,
    playHistory,
    positionResidue,
    gameEnd,
    displayController,
  };
})();

const Player = (tool, name = "player") => {
  const playHistory = [];
  const getName = () => name;
  const getTool = () => tool; // O or X
  let endTurn = false;

  const getPlayHistory = () => playHistory;

  const updateBoard = (playPosition) => {
    game.gameBoard[playPosition] = tool;
    playHistory.push(playPosition);
    game.playHistory.push(playPosition);
    game.positionResidue = game.positionResidue.filter((cell) => {
      // update game position residue
      return cell !== playPosition;
    });
    game.displayController();
  };

  const playGame = () => {
    return new Promise(function play(resolve) {
      if (name === "computer") {
        setTimeout(() => {
          const playPosition =
            game.positionResidue[
              Math.floor(Math.random() * game.positionResidue.length)
            ];
          //   document.getElementById(`grid-${playPosition}`).click();
          //   console.log(`${name} played ${playPosition}`);
          updateBoard(playPosition);
          resolve();
        }, 500);
      } else if (name == "player") {
        // wait for user input!
        const grid = document.getElementById("game-grid");
        grid.addEventListener(
          "click",
          (e) => {
            //   console.log(e.target);
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
  };

  return { getName, getTool, getPlayHistory, playGame };
};

const Controller = () => {
  // document.addEventListener("click", function(e) {
  //   if (e.target.value)
  // })

  const startGame = async () => {
    const player = Player("O", "player");
    const computer = Player("X", "computer");

    // // console.log(player, computer);
    while (game.positionResidue.length > 0) {
      await player.playGame();
      await computer.playGame();
      console.log(`player history ${player.getPlayHistory()}`);
      console.log(`computer history ${computer.getPlayHistory()}`);
    }
    // console.log(playerGame, computerGame);
  };

  return { startGame };
};

// choose O or X

// const Controller = (player, computer) => {
//   const currentGameBoard = game.gameBoard;
// };

// const player = Player("O", "player");
// const computer = Player("X", "computer");

// player manually selects first cell
// computer randomly selects first cell
// player manually selects second cell

const control = Controller();
control.startGame();
