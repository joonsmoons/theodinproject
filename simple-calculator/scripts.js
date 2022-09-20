const add = (a, b) => a + b; 
const subtract = (a, b) => a - b; 
const multiply = (a, b) => a * b; 
const divide = (a, b) => a / b; 

const operate = (operator, a, b) => {
    if (operator == "=") {
        return a
    } else if (operator == "+") {
        return add(a, b);
    } else if (operator == "-") {
        return subtract(a, b);
    } else if (operator == "×") {
        return multiply(a, b);
    } else if (operator == "÷") {
        return divide(a, b)
    }
}

const numbers = document.querySelectorAll(".number");
const outputText = document.querySelector(".output");
const clearButton = document.querySelector(".clear");
const signButton = document.querySelector(".sign");
const operators = document.querySelectorAll(".operator");
let savedValue = 0; 
let calculation = 0; 
let operatorTrigger = false;
let decimalTrigger = false;
let currentOperator = "=";
let numberData = []

for (let number of numbers) {
    number.addEventListener('click', (e) => {
        if (outputText.innerText == "0" || operatorTrigger){
            outputText.innerText = e.target.innerText;
            operatorTrigger = false
        } else {
            outputText.innerText += e.target.innerText;
        }
    })
}

signButton.addEventListener("click", () => {
    if (outputText.innerText.slice(0, 1) == "-") {
        outputText.innerText = outputText.innerText.slice(1)
    } else {
        outputText.innerText = `-${outputText.innerText}`
    }
})

const clearOutput = () => {
    savedValue = 0; 
    numberData = [];
}

clearButton.addEventListener("click", () => {
    outputText.innerHTML = "0";
    clearOutput()
})

for (let operator of operators) {
    operator.addEventListener("click", (e) => {
        // console.log("Before Run:")
        // console.log(savedValue)
        // console.log(currentOperator)

        let outputValue = parseFloat(outputText.innerText);
        numberData.push(outputValue)
        if (numberData.length > 1) {
            console.log(savedValue, currentOperator, outputValue)
            if (currentOperator === "÷" && outputValue === 0) {
                outputValue = 0;
                outputText.innerText = "Hehe! :)";
                clearOutput()
            } else {
                outputValue = operate(currentOperator, savedValue, outputValue);
                outputText.innerText = outputValue;
            }
        }
        savedValue = parseFloat(outputValue);
        currentOperator = e.target.innerText;
        operatorTrigger = true; 

        // console.log("After Run:")
        // console.log(savedValue)
        // console.log(currentOperator)
        // console.log(numberData)
    })
}