
import { sequelize } from "../src/config/conection.js";

const testConection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado e acelerado e pega bem !!");
  } catch (error) {
    console.error("conexão mal sucedida :c");
  }
};

export {testConection}
