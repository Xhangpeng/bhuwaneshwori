import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.get("/sw.js", (_req, res) => {
    res.type("application/javascript");
    res.set("Cache-Control", "public, max-age=0, must-revalidate");
    res.sendFile(path.join(staticPath, "sw.js"));
  });

  app.get("/manifest.json", (_req, res) => {
    res.type("application/manifest+json");
    res.set("Cache-Control", "public, max-age=3600");
    res.sendFile(path.join(staticPath, "manifest.json"));
  });

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
