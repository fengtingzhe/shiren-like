import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const HOST = "127.0.0.1";
const PORT = 4173;
const ROOT = resolve(import.meta.dirname, "..");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

function resolvePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relative = decoded === "/" ? "/Builds/web-demo/" : decoded;
  const normalized = normalize(relative).replace(/^([/\\])+/, "");
  let absolute = resolve(join(ROOT, normalized));

  if (!absolute.startsWith(ROOT)) {
    return null;
  }

  if (decoded.endsWith("/")) {
    absolute = resolve(join(absolute, "index.html"));
  }

  return absolute;
}

const server = createServer(async (request, response) => {
  const target = resolvePath(request.url || "/");
  if (!target) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(target);
    const type = MIME_TYPES[extname(target)] || "application/octet-stream";
    response.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not Found");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`shiren-like web demo server running at http://${HOST}:${PORT}/Builds/web-demo/`);
});
