alert ('hello');

const userInput = document.querySelector('#input-number');
const addBtn = document.querySelector('#btn-add')
const subtractBtn = document.querySelector('#btn-subtract')
const multiplyBtn = document.querySelector('#btn-multiply')
const divideBtn = document.querySelector('#btn-divide')
const currentCalculationOutput = document.querySelector('#current-calculation')
const currentResultOutPut = document.querySelector('#current-result')


console.log('currentCalculationOutput',currentCalculationOutput);
console.log('currentResult',currentResultOutPut);

const defaultResult = 0;

let currentResult = defaultResult;

function getUserInput() {
    return parseInt(userInput.value); //get user input number
}

function outputResult(result,text){
    currentCalculationOutput.textContent = text;
    currentResultOutPut.textContent = result;

}

function add(){
    const operand1 = currentResult;
    const operand2 = getUserInput();
    console.log(operand1, operand2);
    currentResult = operand1 + operand2;
    const calText = `${operand1} + ${operand2}`
    console.log(`${operand1} + ${operand2} = ${currentResult}`)
    outputResult(currentResult,calText);

};

function subtract(){
    const number1 = currentResult;
    const number2 = getUserInput()
    currentResult = number1 - number2;
    const calText = `${number1} - ${number2}` //整數轉換成字符串
    console.log(`${number1} - ${number2} = ${currentResult}`); 
    outputResult(currentResult,calText) 
}

function multiply(){
     const number1 = currentResult;
     const number2 = getUserInput();
     currentResult = number1 * number2;
     const resultText = `${number1} * ${number2}`;
     console.log(`${number1} * ${number2} = ${currentResult}`)
     outputResult(currentResult,resultText);
}

function divide(){
    const number1 = currentResult;
    const number2 = getUserInput();
    if(number1 == 0 || number2 == 0){
        alert('number invaild')
    }else{
        currentResult = number1 / number2;
        const resultText = `${number1} / ${number2}`
        console.log(`${number1} / ${number2} = ${currentResult}`)
        outputResult(currentResult,resultText);
    }
}

addBtn.addEventListener('click',add);

subtractBtn.addEventListener('click',subtract)

multiplyBtn.addEventListener('click',multiply)

divideBtn.addEventListener('click',divide)