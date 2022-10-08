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
  const gameCells = document.querySelectorAll(".grid-item");
  const displayController = () => {
    gameBoard.map((item, index) => {
      //   console.log(item, index, gameCells[index]);
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
    positionResidue,
    gameEnd,
    displayController,
  };
})();

const Player = (tool, name = "player") => {
  const playHistory = [];
  const getName = () => name;
  const getTool = () => tool; // O or X
  const getPlayHistory = () => playHistory;

  const playGame = (playPosition) => {
    const positionResidue = game.positionResidue;
    if (name == "computer") {
      // choose random position from residue if computer
      playPosition =
        positionResidue[Math.floor(Math.random() * positionResidue.length)];
    }
    game.gameBoard[playPosition] = tool;
    playHistory.push(playPosition);
    game.positionResidue = positionResidue.filter((cell) => {
      // update game position residue
      return cell !== playPosition;
    });
    game.displayController();
  };

  if (name === "player") {
    document.addEventListener("click", function (e) {
      if (e.target.id) {
        const gridElement = document.querySelector(`#${e.target.id}`);
        const playPosition = e.target.id.replace(/^\D+/g, "");
        playGame(+playPosition);
        console.log(name, playPosition);
        // const playPosition = grid
      }
    });
  }

  return { getTool, getPlayHistory, playGame };
};

// choose O or X

// const Controller = (player, computer) => {
//   const currentGameBoard = game.gameBoard;
// };

const player = Player("O", "player");
const computer = Player("X", "computer");

// player manually selects first cell
// computer randomly selects first cell
// player manually selects second cell
