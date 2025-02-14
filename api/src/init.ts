import fs from "node:fs";

if (!fs.existsSync("./Uploads")) {
  fs.mkdirSync("./Uploads");
}
