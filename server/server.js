import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { resolve } from "path";
import { promises as fs } from "fs";
import { generateSlug } from "random-word-slugs";

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

const sizeArray = 1000001;

function createNewData(size) {
  const newData = new Array(size).fill(0).map(() => {
    return {
      id: Math.floor(Math.random() * size * 100),
      title: generateSlug(3, { format: "title" }),
      year: 1920 + Math.floor(Math.random() * 100),
      producer: generateSlug(2, { format: "title", categories: "personality" }),
    };
  });
  return newData;
}

server.get("/api/create-data", (req, res) => {
  const dataArray = createNewData(sizeArray);
  fs.writeFile(fileData, JSON.stringify({ data: dataArray }), {
    encoding: "utf8",
  }).then(
    () => {
      res.json({ success: true });
    },
    (error) => {
      res.json({ success: false, error });
    }
  );
});

server.get("/api/data/:fromID/:toID", async (req, res) => {
  const { fromID, toID } = req.params;

  const resultData = await fs.readFile(fileData, { encoding: "utf8" }).then(
    (text) => {
      return JSON.parse(text).data.slice(fromID, toID);
    },
    async () => {
      const dataArray = createNewData(sizeArray);
      await fs.writeFile(fileData, JSON.stringify({ data: dataArray }), {
        encoding: "utf8",
      });
      return dataArray.slice(fromID, toID);
    }
  );
  res.json({ portion: resultData });
});

server.get("/api/data/size", (req, res) => {
  res.json(sizeArray);
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
