import {menu} from './data_61.js';

console.log('menu',menu);
const ContainerButtons = document.querySelector('.btn-container');

const sectionCenter = document.querySelector('.section-center')

const displayMenuItems = (menu) =>{
    let displayMenu = menu.map((item)=>{
        const {id,title,category,price,img ,desc} = item;
        return`
        <article class="menu-item">
          <img
            src="${img}"
            alt="buttermilk"
            pancakes=""
            class="photo"
          />
          <div class="item-info">
            <header>
              <h4>${title}</h4>
              <h4 class="price">${price}</h4>
            </header>
            <p class="item-text">
              ${desc}
            </p>
          </div>
        </article>
        
        `;
    }).join('');
    console.log('displayMenuItem', displayMenu);
    sectionCenter.innerHTML = displayMenu;

}


const categories = ['all','breakfast','lunch','dinner','shakes']
const displayMenuButtons = () =>{
  let displayAllButtons = categories.map((item)=>{
    const {all,breakfast,lunch,dinner,shakes} = item;
    return `
    <button type="button" class="filter-btn" data-id="${item}">${item}</button>
    `
  }).join('');
  console.log('displayMenuButtons', displayAllButtons);
  ContainerButtons.innerHTML = displayAllButtons;

}

window.addEventListener('DOMContentLoaded',()=>{
    displayMenuItems(menu);
})
window.addEventListener('DOMContentLoaded',()=>{
  displayMenuButtons(categories);
}
)