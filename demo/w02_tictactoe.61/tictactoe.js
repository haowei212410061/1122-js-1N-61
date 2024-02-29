const resetBtn = document.querySelector('#reset');
const container = document.querySelector('#container');
const allLi = document.querySelectorAll('#board li');

const o = 'o';
const x = 'x';
let turn = 0; //陣列的index
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

allLi.forEach((item)=>{
    item.addEventListener('click',()=>{
        if(item.classList.contains('disabled')){
            alert('already filled')
            
        }
        else{
            if(turn % 2 === 0){
                item.textContent = 'o'
                item.classList = 'o disabled';
                if(checkwin('o')){
                    winMessage(o)
                    done = true;
                }
            }
            else if(turn % 2 === 1){
                item.textContent = 'x';
                item.classList = 'x disabled';
                if(checkwin('x')){
                    winMessage(x)
                    done = true;
                    
                }
            }
            if(!done && turn < 8){
                turn ++;
            }
            else if(!done && turn >= 8){
                alert('tie')
            }
        }
 
    })

})

const winMessage = (player) =>{
    if (player === 'o'){
        container.style.backgroundColor = 'rgba(144,238,144,0.5)';
    }
    else{
        container.style.backgroundColor = 'rgba(240,118,128,0.5)';
    }
    alert(`player ${player} wins`)
}

const checkwin = (player) =>{
    let p = [];
    allLi.forEach((item)=>{
        p.push(item.classList.contains(player));
    })
    console.log('p',p);
    const [p1,p2,p3,p4,p5,p6,p7,p8,p9]= p;

    if((p1 && p2 && p3)|| 
       (p4 && p5 && p6)|| 
       (p7 && p8 && p9)||
       (p1 && p4 && p7)|| 
       (p2 && p5 && p8)|| 
       (p3 && p6 && p9)||
       (p1 && p5 && p9)||
       (p3 && p5 && p7)
       )
       return true;
       else return false;
}