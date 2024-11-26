import { ProductService } from "../services/product.service.js";

const instanciaServico = new ProductService();

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
    // Tratamento de erros
    console.error("Erro ao criar produto:", error.message);

    res.status(500).json({
      error: "Erro interno no servidor: " + error.message,
    });
  }
};

export { createProduct };
