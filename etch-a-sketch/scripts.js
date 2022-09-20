const container = document.querySelector(".container");
const button = document.querySelector("#click-me")
let divDim = 16; // default div dimension \

const createGrid = () => {
    container.innerHTML = "";
    for (let i = 0; i < divDim * divDim; i++) {
        const div = document.createElement("div");
        div.className = "box"
        container.appendChild(div);
    }
    const boxes = document.querySelectorAll(".box")
    for (let box of boxes) {
        box.addEventListener("mouseover", () => {
            box.style.backgroundColor = "black"
            box.style.transition = "background-color 2s"
        })
    }
}

button.addEventListener("click", () => {
    let input = prompt("Input number of squares per side for the new grid.");
    if (input >= 100) {
        alert("Too many squares! Input a number less than 100.");
    } else {
        divDim = input;
        container.style.gridTemplateColumns = `repeat(${divDim}, 1fr)`;
        createGrid();
    }
})