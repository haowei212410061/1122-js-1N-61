const resetBtn = document.querySelector('#reset');
const container = document.querySelector('#container');
const allLi = document.querySelectorAll('#board li');

const o = 'o';
const x = 'x';
let turn = 0; //陣列的index 因為陣列是從0開始 所以第一次點擊的時候=list[0]
let done = false; //done=true代表遊戲結束 ,反之遊戲還沒結束

const reset = () => {
    allLi.forEach((item)=>{   //foreach: javascript中用於調用數組中的每個元素
        item.classList = ''; //item 代表的是allLi數組中的每一個元素
        item.textContent = '+';
    })
    container.style.backgroundColor = '#666'//更改container樣式
    turn = 0;
    done = false
}
resetBtn.addEventListener('click', reset);

allLi.forEach((item)=>{
    item.addEventListener('click',()=>{
        if(item.classList.contains('disabled')){ //disabled(一個html的屬性）: html中用於禁用表單元素 無法被點擊
            alert('already filled') //第一輪遊戲,因為沒有元素被點擊,條件不成立;往下執行else
                                    //被點擊的元素class = 'disabled' 元素不能被點擊
                                    //第二輪遊戲,如果點擊上一輪點擊過的item,會觸發if條件 彈窗提醒：already filled
        }
        else{
            if(turn % 2 === 0){ 偶數代表＝'o' 
                item.textContent = 'o'
                item.classList = 'o disabled'; //直接更改元素的class為'o disabled' 不能被點擊
                '
                if(checkwin('o')){
                    winMessage(o)
                    done = true; //當done = true,遊戲終止
                }
            }
            else if(turn % 2 === 1){ 奇數代表＝'x'
                item.textContent = 'x';
                item.classList = 'x disabled';
                if(checkwin('x')){
                    winMessage(x)
                    done = true;
                    
                }
            }
            if(!done && turn < 8){ //遊戲順序＝'o'一次 , 'x'一次
                turn ++;
            }
            else if(!done && turn >= 8){ //平手的判斷：當done = true , 點擊的次數達到上限
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
    allLi.forEach((item)=>{                      //forEach用於迭代數組內的所有item,每次迭代檢查item的值是否包含player,並將結果新增到p陣列中
        p.push(item.classList.contains(player));//p.push：將item.classList.contains(player)檢查的值(true or false)新增到p陣列的末尾
    })                                         //item.classList.contains(player)用於檢查元素是否包含player的值 如果包含player＝true 反之為false
    console.log('p',p);
    const [p1,p2,p3,p4,p5,p6,p7,p8,p9]= p; //解構賦值：從陣列中快速提取值 並將值分配給變量
                                          //p是一個包含布林值的陣列 解構賦值將這個陣列的值分配給了p1~p9 
    if((p1 && p2 && p3)||                 //條件判斷：三個為true則獲勝
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
