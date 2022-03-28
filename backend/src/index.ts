import app from "./app";
import { envVars } from "./env-variables";

app.listen(envVars.apiPort, () =>
  console.log(`Pace API is running on Port: ${envVars.apiPort}`)
);
