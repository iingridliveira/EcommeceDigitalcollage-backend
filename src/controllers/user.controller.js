import { UserServices } from "../services/user.service.js";

const instaciaservece = new UserServices();

const createUser = async (req, res) => {
  try {
    const { firstname, surname, email, password } = req.body;
    const newUser = await instaciaservece.registerService(
      firstname,
      surname,
      email,
      password
    );

    return res.status(201).json({
      message: "User criado com sucesso",
      newUser,
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
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newlongin = await instaciaservece.loginServer(email, password);
    return res.status(201).json({
      message: "User logado com suceso",
      newlongin,
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
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, surname, email } = req.body;
  const newUserupdadte = await instaciaservece.updateServer(
    id,
    firstname,
    surname,
    email
  );
  return res.status(201).json({
    message: "User atualizado  com sucesso",
    newUserupdadte,
  });
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
 
  const newUserupdelete = await instaciaservece.deliteServer(
    id
  );
  return  res.status(201).json({
    message: "User deletado com sucesso",
    newUserupdelete,
  });
};

export { createUser, login, updateUser, deleteUser };
