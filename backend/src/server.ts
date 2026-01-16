import { ENV } from "@config/env.config.js";
import app from "./app.js";

app.listen(ENV.PORT, () => {
  console.log(`✅ Server running on port ${ENV.PORT} (${ENV.NODE_ENV})`);
});