const calculateBtn = document.querySelector('#calculate');
const bmiResult = document.querySelector('#result');
const suggest = document.querySelector('#suggest');
let HeiInput = document.querySelector('#height');
let WeiInput = document.querySelector('#weight');

console.log(HeiInput);
console.log(WeiInput);
function getValue1() {
  let Result = Number(HeiInput.value);
  return Result;
}
function getValue2() {
  let Result = Number(WeiInput.value);
  return Result;
}

function bmiCalc_61() {
  let weight = getValue2();
  let height = getValue1();
  let HeightChange = (height / 100).toFixed(2);
  return weight / (HeightChange * HeightChange);
}
function bmi_normal_low() {
  let weight = getValue2();
  let height = getValue1();
  let HeightChange = height / 100;
  return 18.5 * (HeightChange * HeightChange);
}
function bmi_normal_high() {
  let height = getValue1();
  let HeightChange = height / 100;
  return 24 * (HeightChange * HeightChange);
}

function bmiCalcSuggestion_61() {
  let bmi = bmiCalc_61().toFixed(2);
  if (bmi < 18.5) {
    let normal_low = bmi_normal_low();
    let weight1 = getValue2();
    bmiResult.innerHTML = `Your BMI is ${bmi} Underweight`;
    suggest.innerHTML = `add at least ${(normal_low - weight1).toFixed(
      2
    )} kg to normal.`;
  } else if (bmi < 24) {
    bmiResult.innerHTML = `Your BMI is ${bmi}. normal.`;
  } else {
    let normal_high = bmi_normal_high(height);
    let weight2 = getValue2();
    // console.log('normal_high', normal_high);

    bmiResult.innerHTML = `Your BMI is ${bmi} Underweight`;
    suggest.innerHTML = `add at least ${(normal_high - weight2).toFixed(
      2
    )} kg to normal.`;
  }
}

calculateBtn.addEventListener('click', () => {
  bmiCalcSuggestion_61();
});
