import { renderToStaticMarkup } from "react-dom/server";
import { createElement as h } from "react";
import
{
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
  existsSync
} from "node:fs";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import App from "./App.js";

// Following code is just very simple version of SSG
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distPath = path.join(__dirname, "dist");

const shell = readFileSync(path.join(__dirname, "index.html"), "utf-8");

const app = renderToStaticMarkup(h(App));
const html = shell.replace("<!--ROOT-->", app);

if (!existsSync(distPath))
{
  mkdirSync(distPath);
} else
{
  const files = readdirSync(distPath);
  for (const file of files)
  {
    unlinkSync(path.join(distPath, file))
  }
}

writeFileSync(path.join(distPath, "index.html"), html)