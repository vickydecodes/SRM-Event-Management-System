import app from "./app.js";
import connectDB from "./config/db.config.js";
import { ENV } from "./config/env.config.js";

const startServer = async () => {
  await connectDB(ENV.MONGO_URI);

  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on port ${ENV.PORT}`);
  });
};

startServer();
