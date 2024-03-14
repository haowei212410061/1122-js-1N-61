const C = document.querySelector('#btn-c');
const F = document.querySelector('#btn-f');
const result = document.querySelector('#input-number')
const inputBox = document.querySelector('#current-calculation')
const EndResult = document.querySelector('#current-calculation-1')

const defaultResult = 0;

let currentResult = defaultResult;

function getUserInput() {
    return Number(result.value).toFixed(2); //get user input number
}

function outputResult(result,text){
    inputBox.textContent = text;
    EndResult.textContent = result;

}
function ChangeToC() {
    const FinishResult = parseFloat(getUserInput() * 9.0 / 5 - 32).toFixed(2);
    const Number = `${getUserInput()}F =  ${FinishResult}C`
    outputResult(Number,FinishResult)

}

function ChangeToF() {
    const FinishResult = parseFloat(getUserInput() * 5.0 / 9 + 32).toFixed(2)
    const Number = `${getUserInput()}C =  ${FinishResult}F`
    outputResult(Number,FinishResult)
}



F.addEventListener('click', ChangeToF)
C.addEventListener('click', ChangeToC)