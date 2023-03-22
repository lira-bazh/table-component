import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { promises as fs } from "fs";

import { Html } from "../client/html.js";

const server = express();
const PORT = process.env.PORT || 8080;
const __dirname = process.cwd();
const fileData = `${__dirname}/server/data.json`;

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: "50kb" }),
  express.static("public")
];

middleware.forEach((it) => server.use(it));

server.get("/", (req, res) => {
  res.send("Express server");
});

server.get("/api/data/:fromID/:toID", async (req, res) => {
  const { fromID, toID } = req.params;

  const resultData = await fs
    .readFile(fileData, { encoding: "utf8" })
    .then((text) => {
      const data = JSON.parse(text).data;
      return data.slice(fromID, toID);
    });
  res.json({ portion: resultData });
});

server.get("/api/data/size", async (req, res) => {
  const result = await fs
    .readFile(fileData, { encoding: "utf8" })
    .then((text) => {
      const data = JSON.parse(text).data;
      return data.length;
    });
  res.json(result);
});

server.get("/*", (req, res) => {
  const initialState = {
    location: req.url
  };

  res.send(
    Html({
      body: "",
      initialState
    })
  );
});

server.listen(PORT, () => {
  console.log(`Serving at http://localhost:${PORT}`);
});
