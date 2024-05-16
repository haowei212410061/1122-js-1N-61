//import {menu} from './data_61.js';
//const url = "./api/data_61.json";
const  SUPSBASE_ULR = 'https://itbleknccqovsbposbsv.supabase.co'
const  SUPABASE_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0Ymxla25jY3FvdnNicG9zYnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NTgyMTAsImV4cCI6MjAyOTUzNDIxMH0.tT_GJQ0EAzWNM5v-S8B5k5DA7vojt6l4WezlTOBXbnE'
export const _supabase = supabase.createClient(SUPSBASE_ULR,SUPABASE_key);

let menu = [];
console.log('menu',menu);
const ContainerButtons = document.querySelector('.btn-container');

const sectionCenter = document.querySelector('.section-center')


const fetchData = async () => {
  try{
    let {data,error} = await _supabase.from('menu_61').select('*');
    console.log(data);
    return data;
  }catch(error){
    console.log(error);
  }
}
const displayMenuItems = (menu) =>{
    let displayMenu = menu.map((item)=>{
        const {id,title,category,price,remote_img ,descrip} = item;
        return`
        <article class="menu-item">
          <img
            src="${remote_img}"
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