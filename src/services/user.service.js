import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export class UserServices {
 async registerService(firstname, surname, email, password) {
    try {
      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar o usuário no banco de dados
      const createdUser = await User.create({
        firstname,
        surname,
        email,
        password: hashedPassword,
      });

      // Remover a senha da resposta
      const { password: _, ...user } = createdUser.get({ plain: true });

      return user;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw new Error("Erro ao registrar o usuário.");
    }
  }
}
