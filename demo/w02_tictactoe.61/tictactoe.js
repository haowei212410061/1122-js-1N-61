const resetBtn = document.querySelector('#reset');
const container = document.querySelector('#container');
const allLi = document.querySelectorAll('#board li');

const o = 'o';
const x = 'x';
let turn = 0;
let done = false;

const reset = () => {
    allLi.forEach((item)=>{   //javascript中用於迭代數組的函數 該函數按順序為每個數組執行一次提供的函數
        item.classList = '';
        item.textContent = '+';
    })
    container.style.backgroundColor = '#666'
    turn = 0;
    done = false
}
resetBtn.addEventListener('click', reset);
