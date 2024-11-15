import { UserServices } from "../services/user.service.js";

const instaciaservece = new UserServices();

const createUser = async (req, res) => {
  const {  firstname, surname, email, password } = req.body;
  const newUser = await instaciaservece.registerService(
    firstname,
    surname,
    email,
    password
  );

  return res.status(201).json({
    message: "User criado ",
    newUser,
  });
};
export { createUser };
