//import {menu} from './data_61.js';

const url = "./api/data_61.json";
let menu = [];
console.log('menu',menu);
const ContainerButtons = document.querySelector('.btn-container');

const sectionCenter = document.querySelector('.section-center')


const fetchData = async () => {
  try{
    const response = await fetch(url);
    const data = response.json();
    console.log('data',data);
    return data;
  }catch(error){
    console.log(error);
  }
}
const displayMenuItems = (menu) =>{
    let displayMenu = menu.map((item)=>{
        const {id,title,category,price,local_img ,descrip} = item;
        return`
        <article class="menu-item">
          <img
            src="${local_img}"
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
              ${descrip}
            </p>
          </div>
        </article>
        
        `;
    }).join('');
    console.log('displayMenuItem', displayMenu);
    sectionCenter.innerHTML = displayMenu;

}


const categories = ['all','breakfast','lunch','dinner','shakes']

const displayMenuButtons = () => {
  const displayAllButtons = categories.map((item) => {
    return `
      <button type="button" class="filter-btn" data-id="${item}">${item}</button>
    `;
  }).join('');

  ContainerButtons.innerHTML = displayAllButtons;

  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.id;
      const filterMenu = menu.filter((item) => item.category === category); // Added a return statement here
      if (category === 'all') {
        displayMenuItems(menu);
      } else {
        displayMenuItems(filterMenu);
      }
    });
  });
};


window.addEventListener('DOMContentLoaded',async()=>{
    const menu = await fetchData();
    displayMenuItems(menu);
})
window.addEventListener('DOMContentLoaded',()=>{
  displayMenuButtons(categories);
}
) 