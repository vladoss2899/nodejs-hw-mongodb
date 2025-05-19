import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstraps = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.error('Error during startup:', err.message);
    process.exit(1);
  }
};

bootstraps();
