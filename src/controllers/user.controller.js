import { UserServices } from "../services/user.service.js";
import { handleError } from "./utils/error.js";
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
    handleError(error, res);
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
    handleError(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
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
  } catch (error) {
    handleError(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const newUserupdelete = await instaciaservece.deliteServer(id);
    return res.status(201).json({
      message: "User deletado com sucesso",
      newUserupdelete,
    });
  } catch (error) {
    handleError(error, res);
  }
};
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await instaciaservece.getserver(id);

    if (user && user.length > 0) {
      return res.status(200).json({
        message: "usuário(a) encontrado(a)",
        user
      });
    } else {
      return res.status(404).json({
        message: "usuário(a)  não encontrado(a)",
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};


export { createUser, login, updateUser, deleteUser, getUser };
