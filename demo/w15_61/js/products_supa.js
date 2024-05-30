
import { _supabase } from './client.supabase_61.js';
let product_61 
const getProductsSupabase_61 = async () => {
  try {
    let { data, error } = await _supabase.from('product_61').select('*');
    console.log('products_data', data);
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
    console.log(companyName);
    if(companyName === 'all'){
      await getProductsSupabase_61();
    }else{
      let {data:company,error} = await _supabase.from('company_61').select('id').eq('name',companyName)
      console.log(company[0].id);
      const companyId = company[0].id

      let {data,error:product} = await _supabase.from('product_61').select('*').eq('companyId',companyId);
      console.log(data)
    }
  })
})

document.addEventListener('DOMContentLoaded', async () => {
  const products_61 = await getProductsSupabase_61(); // assign the fetched data to a variable
  DisplayProducts(products_61);
});