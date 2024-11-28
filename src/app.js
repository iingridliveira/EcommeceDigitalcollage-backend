import express from "express";
import { Router } from "express";
import { routes } from "./routes/index.routes.js";

const rota = Router();
export const app = express();

rota.get("/", (req, res) => {
  const rotaFictia = "olaa mudão doido";
  res.json({ rotaFictia });

});

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});
app.use(rota);
app.use(routes);
