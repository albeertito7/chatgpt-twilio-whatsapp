import app from "./src/app.js"
import { port } from "./config.js"

app.listen(port, () => {
  console.log(`Server listening on port ${port} ...`);
});