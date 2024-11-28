import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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
  async loginServer(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { error: "Usuário não encontrado" };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { error: "Senha inválida" };
      }

      const token = jwt.sign({ userId: user.id, email }, "your-secret-key", {
        expiresIn: "1h",
      });
      console.log(token)
      return { token };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return { error: "Erro ao fazer login" };
    }
  }
}
