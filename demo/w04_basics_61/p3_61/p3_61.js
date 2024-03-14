import {sdata, students }from './data.js';

console.log('sdata',sdata);
console.log('students',students);

console.log(sdata.sort());

sdata.sort(function(a,b){return b-a})
console.log('sdata after sorting descending',sdata)
console.log(`the height score : ${sdata[0]}`)
console.log(`the lowest score : ${sdata[sdata.length -1]}`)

console.log('students',students)
const students2 = students.map((student)=>{
    return {...student, role:'student'}
});

students2.sort(function(a,b){return b.score - a.score})
console.log('students2 sorting descending',students2)
console.log(`the height score : ${students2[0].score}`)
console.log(`the lowest score : ${students2[students2.length -1].score}`)