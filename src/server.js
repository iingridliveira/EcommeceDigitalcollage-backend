
import { testConection } from "../tests/testConection.js";
import { app } from "./app.js";

const port = 4007;

app.listen(port, () => {
    testConection();
    console.log(`Servidor rodando na porta ${port}`);
});
