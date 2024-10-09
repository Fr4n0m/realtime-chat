import express from "express";
import cors from "cors";
import logger from "morgan";
import path from "path";
/* import dotenv from "dotenv";
 */
import { Server } from "socket.io";
import { createServer } from "node:http";

/* dotenv.config();
 */
const port = process.env.PORT || 4000;

const app = express();

// Configuración de socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user has connected!");

  socket.on("disconnect", () => {
    console.log("an user has disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

/* const db = createClient({
  url: "libsql://cuddly-wasp-midudev.turso.io",
  authToken: process.env.DB_TOKEN,
}); */

/* await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT,
      user TEXT
    )
  `);

io.on("connection", async (socket) => {
  console.log("a user has connected!");

  socket.on("disconnect", () => {
    console.log("an user has disconnected");
  });

  socket.on("chat message", async (msg) => {
    let result;
    const username = socket.handshake.auth.username ?? "anonymous";
    console.log({ username });
    try {
      result = await db.execute({
        sql: "INSERT INTO messages (content, user) VALUES (:msg, :username)",
        args: { msg, username },
      });
    } catch (e) {
      console.error(e);
      return;
    }

    io.emit("chat message", msg, result.lastInsertRowid.toString(), username);
  });

  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: "SELECT id, content, user FROM messages WHERE id > ?",
        args: [socket.handshake.auth.serverOffset ?? 0],
      });

      results.rows.forEach((row) => {
        socket.emit("chat message", row.content, row.id.toString(), row.user);
      });
    } catch (e) {
      console.error(e);
    }
  }
}); */

// Middleware para registrar las solicitudes
app.use(logger("dev"));

// Servir archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(process.cwd(), "dist")));

// Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
