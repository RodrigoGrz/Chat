import "reflect-metadata";
import express from "express";
import path from "node:path";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();

const server = createServer(app);

mongoose.connect("mongodb://localhost:27017/rocketsocket", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.use(express.static(path.join(__dirname, "..", "public")));

const io = new Server(server);

io.on("connection", (socket) => {
    // console.log("Socket", socket);
});

export { server, io };