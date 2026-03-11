import { createApplication } from "./src/http/create-application.js";
import { loadConfig } from "./src/config/load-config.js";
import { startRealtimeServer } from "./src/realtime/start-realtime-server.js";
import { createMessageRepository } from "./src/storage/create-message-repository.js";

const config = loadConfig();
const repository = createMessageRepository(config);
const app = createApplication(config);
const server = startRealtimeServer({
  app,
  config,
  messageRepository: repository,
});

server.listen(config.port, () => {
  process.stdout.write(
    `Server running on port ${config.port} with ${config.storageDriver} storage\n`
  );
});
