import { uuid } from "uuidv4";
import { Server } from "ws";
import { Iws } from "../../interfaces/ws/Iws";

const clients: Iws[] = [];

const server = new Server({ port: 3334 });

server.on("connection", (ws: Iws, req) => {
  const [, from] = req.url.split("/");
  ws.channel = from;
  ws.id = req.headers["ws-user-id-key"].toString();
  clients.push(ws);

  ws.on("message", (message) => {
    clients.map((client) => {
      if (ws.channel === client.channel && ws.id != client.id)
        client.send(message);
    });
  });
});

export { server };
