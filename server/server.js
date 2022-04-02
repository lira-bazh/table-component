import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { resolve } from "path";
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
  express.static(resolve(__dirname, "dist")),
];

middleware.forEach((it) => server.use(it));

server.get("/", (req, res) => {
  res.send("Express server");
});

server.get("/api/create-data", (req, res) => {
  const size = 1500000;
  const newData = new Array(size).fill(0).map(() => {
    return { name: Math.random(), year: 1920 + Math.floor(Math.random() * 100) };
  });
  fs.writeFile(fileData, JSON.stringify({ data: newData }), {
    encoding: "utf8",
  });
});

server.get("/api/data/:fromID/:toID", (req, res) => {
  const { fromID, toID } = req.params;
  fs.readFile(fileData, { encoding: "utf8" }).then(
    (text) => {
      res.json(JSON.parse(text).pizzas.slice(fromID, toID));
    },
    (error) => {
      res.json(`${error}`);
    }
  );
});

server.get("/*", (req, res) => {
  const initialState = {
    location: req.url,
  };

  res.send(
    Html({
      body: "",
      initialState,
    })
  );
});

server.listen(PORT, () => {
  console.log(`Serving at http://localhost:${PORT}`);
});
