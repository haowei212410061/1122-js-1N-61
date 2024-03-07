let c,f;
c = Number(prompt('enter a tamperature in c')).toFixed(2);
console.log('c',c);
f = (c * 9.0 / 5 + 32).toFixed(2);
const output = `${c} C = ${f} F`;
console.log(output);

const Result = document.querySelector('.result');
Result.textContent = output;