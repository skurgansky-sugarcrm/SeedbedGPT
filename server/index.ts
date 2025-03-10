import express, { Router, json, static as expressStatic } from "express";
import { fileURLToPath } from "url";
import { join, dirname, resolve } from "path";
import api from "./api/api-bucket";
import { port, webPath } from "./config";

const getDirname = () => resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIR_NAME = getDirname();
const staticPath = join(DIR_NAME, webPath);

const app = express();
const router = Router();
app.use(json());
app.use(expressStatic(staticPath));
app.use("/api", router);

for (const { method, endpoint, handler } of api) {
  router[method.toLowerCase() as "get" | "post"](`/${endpoint}`, [handler]);
  console.log(`Added "${method.toUpperCase()}:${endpoint}" endpoint`);
}

app.listen(port);

console.log("Server started on port", port);
console.log("Static content served from", staticPath);
