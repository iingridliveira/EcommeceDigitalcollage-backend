import { Product } from "../models/product.js";

//sevice of read,delete and update
export class ProductServiceRUD {
  async updateServer(
    id,
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    category_ids,
    images = [],
    options = []
  )

  {
    try {
 const updateProduct = await Product.findByPk({ enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    category_ids,
    images ,
    options }, {where:{id}}

 )
 return updateProduct;
    } catch (error) {
        console.log(error)
    }
  }

  async deleteServer() {
    try {
    } catch (error) {}
  }
  async getServer() {
    try {
    } catch (error) {}
  }
  async getALLServer() {
    try {
    } catch (error) {}
  }
}