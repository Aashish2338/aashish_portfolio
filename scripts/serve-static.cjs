const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");

const exportDirectory = path.resolve(__dirname, "..", "out");
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".pdf", "application/pdf"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"],
  [".woff2", "font/woff2"],
]);

const server = http.createServer((request, response) => {
  void serveFile(request, response);
});

async function serveFile(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url ?? "/", "http://localhost").pathname,
    );
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  const filePath = path.resolve(exportDirectory, `.${pathname}`);
  if (
    filePath !== exportDirectory &&
    !filePath.startsWith(`${exportDirectory}${path.sep}`)
  ) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    let resolvedPath = filePath;
    let fileInfo = await fs.stat(resolvedPath);
    if (fileInfo.isDirectory()) {
      resolvedPath = path.join(resolvedPath, "index.html");
      fileInfo = await fs.stat(resolvedPath);
    }

    if (!fileInfo.isFile()) {
      response.writeHead(404).end("Not found");
      return;
    }

    const body = await fs.readFile(resolvedPath);
    response.writeHead(200, {
      "Cache-Control": "no-cache",
      "Content-Length": body.length,
      "Content-Type":
        contentTypes.get(path.extname(resolvedPath).toLowerCase()) ??
        "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      response.writeHead(404).end("Not found");
      return;
    }

    console.error("Unable to serve the static export:", error);
    response.writeHead(500).end("Internal server error");
  }
}

async function start() {
  try {
    const exportInfo = await fs.stat(exportDirectory);
    if (!exportInfo.isDirectory()) {
      throw new Error(`${exportDirectory} is not a directory.`);
    }
  } catch (error) {
    console.error(
      `Static export not found at ${exportDirectory}. Run "npm run build" first.`,
      error,
    );
    process.exitCode = 1;
    return;
  }

  const port = Number(process.env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new RangeError(`Invalid PORT: ${process.env.PORT}`);
  }

  server.listen(port, "0.0.0.0", () => {
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Unable to determine the static server port.");
    }
    console.log(`Serving ${exportDirectory} at http://localhost:${address.port}`);
  });
}

void start();
