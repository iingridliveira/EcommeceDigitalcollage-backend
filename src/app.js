import express from "express";
import { Router } from "express";

const rota = Router();
export const app = express();

rota.get("/", (req, res) => {
  const rotaFictia = "olaa mudão doido";
  res.json({ rotaFictia });
});

app.use(express.json());
app.use(rota);
