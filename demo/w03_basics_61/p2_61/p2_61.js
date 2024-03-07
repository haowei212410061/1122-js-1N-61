const C = document.querySelector('#btn-c');
const F = document.querySelector('#btn-f');
const result = document.querySelector('#input-number')
const inputBox = document.querySelector('#current-calculation')
const EndResult = document.querySelector('#current-calculation-1')



function getUserInput() {
    return Number(result.value).toFixed(2); //get user input number
}
function ChangeToC() {
    const FinishResult = parseFloat(getUserInput() * 9.0 / 5 - 32).toFixed(2);
    inputBox.textContent = FinishResult;
    EndResult.textContent = `${getUserInput()}C =  ${FinishResult}F`

}

function ChangeToF() {
    const FinishResult = parseFloat(getUserInput() * 5.0 / 9 + 32).toFixed(2)
    inputBox.textContent = FinishResult;
    EndResult.textContent = `${getUserInput()}C =  ${FinishResult}F`
}



F.addEventListener('click', ChangeToF)
C.addEventListener('click', ChangeToC)