import { CategoryService } from "../services/category.service.js";
const instaciaService = new CategoryService();

const createCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;
    const newCategory = await instaciaService.createCategory(
      name,
      slug,
      use_in_menu
    );
    return res.status(201).json({
      message: "category criada",
      newCategory,
    });
  } catch (error) {
    if (error.response) {
      // Erro da API consumida
      res
        .status(error.response.status)
        .json({ error: error.response.data || "Erro na API externa" });
    } else if (error.request) {
      // Sem resposta da API consumida
      res
        .status(504)
        .json({ error: "Gateway Timeout: Sem resposta do servidor externo." });
    } else {
      // Outros erros
      res
        .status(500)
        .json({ error: "Erro interno no servidor: " + error.message });
    }
  }
};


const updateCategory = async (req, res) => {
   try {
    const {id} = req.params;
  const {name, slug, use_in_menu} = req.body;
  const newCategoryUpdate = await instaciaService.updateCategory(id, name, slug, use_in_menu)
  return res.status(201).json({
    message: "Category atualizada",
    newCategoryUpdate,
  });
  } catch (error) {
    if (error.response) {
      // Erro da API consumida
      res
        .status(error.response.status)
        .json({ error: error.response.data || "Erro na API externa" });
    } else if (error.request) {
      // Sem resposta da API consumida
      res
        .status(504)
        .json({ error: "Gateway Timeout: Sem resposta do servidor externo." });
    } else {
      // Outros erros
      res
        .status(500)
        .json({ error: "Erro interno no servidor: " + error.message });
    }
  }
}

export {createCategory, updateCategory};

