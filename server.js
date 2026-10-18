
import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import majorRoutes from "./src/routes/majorRoutes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsPath = path.join(__dirname, "src", "views");
const publicPath = path.join(__dirname, "src", "public");

app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    result: null,
    error: null,
    input: "",
  });
});

app.use(majorRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
