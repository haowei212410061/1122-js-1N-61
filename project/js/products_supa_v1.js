
import { _supabase } from './client.supabase_61.js';
let product_61 = []
const getProductsSupabase_61 = async () => {
  try {
    let { data, error } = await _supabase.from('product_61').select('*,company_61(*)');
    return data; // return the fetched data, not product_61
  } catch (error) {
    console.log(error);
  }
};

const productContainer = document.querySelector('.products-container');

const companyBtns = document.querySelectorAll('.company-btn');

const DisplayProducts = (products) => {
  let productsContent = products.map((product) => {
    const { title, price, localImg } = product;
    return `
      <div class="single-product">
        <img
          src="${localImg}"
          class="single-product-img img"
          alt="${title}"
        />
        <footer>
          <h3 class="name">${title} </h3>
          <span class="price">${price}</span>
        </footer> 
      </div>
    `;
  }).join('');
  productContainer.innerHTML = productsContent;
};

companyBtns.forEach((btn)=>{
  btn.addEventListener('click',async(e)=>{
    const companyName = e.currentTarget.dataset.id;
    const products = await getProductsSupabase_61();
    console.log(companyName);
    if(companyName === 'all'){
      product_61 = products;
      
    }else{
      product_61 = products.filter((product)=>
        product.company_61.name === companyName      
      )
      console.log(product_61)
      DisplayProducts(product_61);
    }
  })
})

document.addEventListener('DOMContentLoaded', async () => {
  const products_61 = await getProductsSupabase_61(); // assign the fetched data to a variable
  DisplayProducts(products_61);
});
