//import { products_xx, all_products_xx } from './p1_data_61.js';

import { _supabase } from './client.supabase_61.js'
let products_61 = []
const getProductsSupabase_61 = async () => {
  try {

    let { data, error } = await _supabase.from('product_61').select('*')
    console.log('products_data', data)
    return product_61

  } catch (error) {
    console.log(error)
  }
}

const productContainer = document.querySelector('.products-container');


const DisplayProducts =  () => {

};

document.addEventListener('DOMContentLoaded', async () => {

  products_61 = await getProductsSupabase_61();
  DisplayProducts(products_61);
});
