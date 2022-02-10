import { server } from "./http";
import "./websocket/ChatService";

server.listen(3001, () => console.log("Server is running!"));