import express from "express";
import { Router } from "express";
import { testConection } from "../tests/testConection.js";

const rota = Router();
const app = express();
const port = 4007;

rota.get("/", (req, res) => {
    const rotaFictia = "olaa mudão doido";
    res.json({rotaFictia });
});


app.use(express.json());
app.use(rota);

app.listen(port, () => {
    testConection();
    console.log(`Servidor rodando na porta ${port}`);
});
