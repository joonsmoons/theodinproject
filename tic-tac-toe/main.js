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

const gameBoard = ["O", "", "", "O", "", "", "O", "", ""];
