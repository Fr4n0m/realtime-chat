import express from "express";
import logger from "morgan";
import path from "path";

const port = process.env.PORT || 3000;

const app = express();

// Middleware para registrar las solicitudes
app.use(logger("dev"));

// Servir archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(process.cwd(), "dist")));

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
