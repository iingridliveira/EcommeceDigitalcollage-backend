import { Product } from "../models/product.js";
import { Category } from "../models/category.js";

export class ProductService {
  async createProduct({
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    category_ids,
  }) {
    try {
    
      const product = await Product.create({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
        category_ids
      });

    
  

 
       console.log(product)
  
       const productWithCategories = await Category.findByPk(category_ids, {
         include: Product,
      
       });


       product.setAttributes(Category)
      console.log(productWithCategories)

      return productWithCategories;
    } catch (error) {
      console.error("Erro ao criar produto:", error.message);
      throw error;
    }
  }
}
