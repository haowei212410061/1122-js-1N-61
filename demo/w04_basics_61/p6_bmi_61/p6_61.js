import { bmi_data } from './data.js';

let bmi_data_61 = bmi_data;

function bmiCalc(height, weight) {
    return weight / (height * height);
}

function bmiCalcResult(height, weight) {
    let bmi = bmiCalc(height, weight).toFixed(2);
    console.log(`For (height, weight) = (${height}, ${weight}), the BMI = ${bmi}`);
}

function bmiDataCalc(data){
    data.forEach(function(item){
        bmiCalcResult(item.height,item.weight)
    })
}
bmiDataCalc(bmi_data_61)

function bmi_normal_low(height, weight) {
    return 18.5 * height * height;
}

function bmi_normal_high(height, weight) {
    return 24 * height * height;
}

function bmiCalcSuggestion(height, weight) {
    let bmi = bmiCalc(height, weight).toFixed(2);
    if (bmi < 18.5) {
        let normal_low = bmi_normal_low(height, weight);
        console.log(`For (height, weight) = (${height}, ${weight}), the BMI = ${bmi} which is ${(normal_low - weight).toFixed(2)} kg lower than normal`);
    } else if (bmi >= 18.5 && bmi < 24) {
        console.log(`For (height, weight) = (${height}, ${weight}), the BMI = ${bmi} which is within normal range`);
    } else {
        let normal_high = bmi_normal_high(height, weight);
        console.log(`For (height, weight) = (${height}, ${weight}), the BMI = ${bmi} which is ${(weight - normal_high).toFixed(2)} kg higher than normal`);
    }
}

function bmiDataCalcSuggestion(data) {
    data.forEach(function (item) {
        bmiCalcSuggestion(item.height, item.weight);
    });
}

//  bmiDataCalcSuggestion(bmi_data);
