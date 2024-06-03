import express from "express";
import cookieParser from "cookie-parser";
import config from "config";
import router from "./src/Routes";
import { Start } from "./src/db/connection";
const port: number = config.get("SERVER_PORT");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(router);
async function StartServer() {
  await Start();
  app.listen(port, () => {
    console.log("App Listening On Port " + port);
  });
}

StartServer();
