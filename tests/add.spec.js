import { app } from "../src/app";
import request from "supertest";

let server;

// Inicializar o servidor antes dos testes
beforeAll(() => {
  server = app.listen(4000, () =>
    console.log("Servidor iniciado para testes. Disponível na porta 4000")
  );
});

// Encerrar o servidor após os testes
afterAll(() => {
  server.close();
});

test("deve criar um novo usuário na rota POST", async () => {
  const novoUsuario = {
    firstname: "Maria4",
    surname: "Silva",
    email: "maria54@email.com",
    password: "123456",
  };

  const response = await request(server)
    .post("/v1/user") // Rota para criar o usuário
    .send(novoUsuario); // Corpo da requisição

  // Verifica o status
  expect(response.status).toBe(201);

  // Valida os campos da resposta
  expect(response.body).toEqual({
    message: "User criado com sucesso",
    newUser: expect.objectContaining({
      id: expect.any(Number), // Verifica se 'id' é um número
      firstname: novoUsuario.firstname,
      surname: novoUsuario.surname,
      email: novoUsuario.email,
      updatedAt: expect.any(String), // Verifica se 'updatedAt' é uma string (ISO date)
      createdAt: expect.any(String), // Verifica se 'createdAt' é uma string (ISO date)
    }),
  });
});
