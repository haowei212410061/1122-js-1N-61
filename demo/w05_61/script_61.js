import {menu} from './data_61.js';

console.log('menu',menu);

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

window.addEventListener('DOMContentLoaded',()=>{
    displayMenuItems(menu);
})