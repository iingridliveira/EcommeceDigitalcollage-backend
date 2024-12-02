import { ProductService } from "../services/product.service.js";
import { ProductServiceRUD } from "../services/productRUD.service.js";
import { handleError } from "./utils/error.js";

const instanciaServico = new ProductService();
const instaciePtoductsever = new ProductServiceRUD();

const createProduct = async (req, res) => {
  try {
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
    } = req.body;

  

    const newProduct = await instanciaServico.createProduct({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
    });

    return res.status(201).json({
      message: "Produto criado com sucesso",
      product: newProduct,
    });
  } catch (error) {
    handleError(error, res) // Tratamento de erros
  } 
};
const updateProduct= async (req, res) => {
  try {
    const {id} = req.params;
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
    } = req.body;

    const newProductupdate = await instanciaServico.createProduct({
      id,
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
    });

    return res.status(201).json({
      message: "Produto atualizado com suceesso com sucesso",
      product: newProductupdate,
    });
  } catch (error) {
    handleError(error, res); // Tratamento de erros
  }
};



export { createProduct, updateProduct };
