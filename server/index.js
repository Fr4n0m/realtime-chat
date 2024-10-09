import express from "express";
import cors from "cors";
import logger from "morgan";
import path from "path";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uarblvxkkgphukrzilrc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcmJsdnhra2dwaHVrcnppbHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0ODYyMDYsImV4cCI6MjA0NDA2MjIwNn0.9YTK-wQhFJIs05DaNaRo82gIl14Z32t1DQJ4pyyYkXU";
const supabase = createClient(supabaseUrl, supabaseKey);

/* import dotenv from "dotenv";
 */
import { Server } from "socket.io";
import { createServer } from "node:http";

/* dotenv.config();
 */
const port = process.env.PORT || 4000;

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://realtime-chat-ten-nu.vercel.app/",
];

// Configuración de socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user has connected!");

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });

  socket.on("chat message", async (msg) => {
    const username = socket.handshake.auth.username ?? "anonymous";
    console.log({ username });

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([{ content: msg, user: username }]);

      if (error) throw error;

      io.emit("chat message", msg, data[0].id.toString(), username);
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("fetch messages", async () => {
    try {
      const { data: messages, error } = await supabase
        .from("messages")
        .select("*");

      if (error) throw error;

      messages.forEach((row) => {
        socket.emit("chat message", row.content, row.id.toString(), row.user);
      });
    } catch (e) {
      console.error(e);
    }
  });
});

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
