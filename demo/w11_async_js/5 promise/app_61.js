const heading1 = document.querySelector('.one');
const heading2 = document.querySelector('.two');
const heading3 = document.querySelector('.three');
const heading4 = document.querySelector('.four');

const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  addColor(1000, heading1, 'red')
    .then(() => {
      return addColor(2000, heading2, 'green');
    })
    .then(() => {
      return addColor(1000, heading3, 'blue');
    })
    .then(() => {
      return addColor(1000, heading3, 'blue');
    })
    .then(() => {
      return addColor(500, heading4, 'purple');
    })
    .catch((error) => console.log(error));
});

function addColor(time, element, color) {
  return new Promise((resolve, reject) => {
    if (element) {
      setTimeout(() => {
        element.style.color = color;
        resolve();
      }, time);
    } else {
      reject(new Error(`there is no such element ${element} `));
    }
  });
}

// btn.addEventListener('click', () => {
//     setTimeout(() => {
//         heading1.style.color = 'red';
//         setTimeout(()=>{
//             heading2.style.color = 'green';
//             setTimeout(()=>{
//                 heading3.style.color = 'blue';
//                 setTimeout(()=>{
//                  heading4.style.color = 'purple';
//                 }, 500);
//             }, 1000);
//         }, 2000);
//     }, 1000);
// });



/**
promise 代表承諾
承諾有幾種狀況會發生
1. 承諾被兌現 用resolve()來兌現
2. 承諾被打破 用reject()表示失敗
3. 承諾一直沒有回應(pending) 代表一直沒有回傳 
------------------------------------------
1. 當承諾被兌現 繼續做預定好的下一件事 使用.then()
2. 當承諾被打破 根據這個原因做對應的動作 使用.catch() or .then()的第二個參數
3. 若承諾沒有回應 就繼續等下去
------------------------------------------
Promise用法
1. 創建promise:創建一個promise物件
let a = new Promise(function(resolve,reject){
      //sync or async codes
      //if success,resolve
      //if fail, reject
})
2. Promise可以帶入一個函式 代表要給予承諾的程式 函式會被promise傳入兩個參數 這兩個參數也是函式
*兌現
通常以resolve命名該參數
當完成動作時 就呼叫resolve()兌現承諾

*拒絕
通常以reject命名該參數
當動作失敗時 就呼叫reject()來打破承諾
*/

/**範例 resolve()*/
var a = new Promise(function(resolve,reject){
  setTimeout(function(){   //在一秒後會兌現承諾 因為調用了resolve();
    resolve('hello world');
  },1000)
})

//.then()是代表承諾被實現之後才會執行的 因此在這一秒內看不到a.then會輸出東西 
//一秒到了 輸出Promise {<resolved>:"hello world1"}, hello world1 
a.then(function(value){
  console.log(a);
  console.log(value + '1');
});
//一秒到了 輸出Promise {<resolved>:"hello world2"}, hello world2
a.then(function(value){
  console.log(a);
  console.log(value + '2');
});

console.log(a);//這行不受Promise影響 並不會等待Promise完成後才執行


/**範例 reject()*/
/**非同步邏輯不變 把resolve改成reject*/
var b = new Promise(function(resolve,reject){
  setTimeout(function(){
    reject('oops');
  },1000)
});

/**用.catch抓住錯誤 過了一秒後 可以得到promise拒絕承諾的訊息*/
a.catch(function(value){
  console.log(a);
  console.log(value);
})

/**範例 pending*/
/**當沒有成功resolve and reject的時候 就會pending .then內的程式會一直等待 .catch也不會抓到任何錯誤*/
var c = new Promise(function(resolve,reject){});
console.log(a) //Promise {<pending>}


/**
非同步串接
.then()不論同步或者非同步的程式都可以串接
每一次呼叫then()其實都會產生新的Promise
每一次呼叫的then()都是屬於上一個new Promise()或是then()所產生Promise
而then會回傳一個promise .then會把return值包裹成一個promise 並回傳回去
*/
asyncFn().then(syncFn).then(asyncFn);
function asyncFn(data){
  return new Promise(function(resolve,reject){
    console.log('Async received data:',data);
    setTimeout(function(){
      resolve('async fn');
      },1000);
  })
}

function syncFn(data){
  console.log('sync received data:',data);
  return 'sync fn';
}
/**
先使用asyncFn回傳一個Promise回去
一秒後 syncFn收到了來自asyncFn的兌現的承諾值'async fn'
在輸出'sync received data:async fn' 之後return 'sync fn'
最後javascript會把'sync fn'包裹成一個promise

*/
