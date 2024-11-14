import { app } from "../src/app";
import request from "supertest"
//arquivo home.test.

let server;
 // Inicializar o servidor
beforeAll(() => {
   server = app.listen(4000, ()=> console.log('Servidor iniciado para testes. Disponível na porta 4000')); // Ou a porta desejada
});


test('deve retornar a mensagem de boas-vindas', async () => {
  const response = await request(server).get('/');

  expect(response.status).toBe(200); // Verifica o status da resposta
  expect(response.body).toEqual({
        rotaFictia: "olaa mudão doido",
  }); // Verifica o corpo da resposta
});
