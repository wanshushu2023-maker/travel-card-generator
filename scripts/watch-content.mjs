import fs from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inboxDir = path.join(rootDir, "content-inbox");
let timeout = null;

console.log("📁 Watching content-inbox/ for changes...");
console.log(`   ${inboxDir}\n`);

fs.watch(inboxDir, { recursive: true }, (eventType, filename) => {
  if (filename === ".DS_Store" || !filename) return;
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log(`\n📄 File changed: ${filename}`);
    console.log("🔄 Running sync...");
    const child = spawn("npm", ["run", "sync:content"], {
      cwd: rootDir,
      stdio: "inherit",
      shell: true
    });
    child.on("close", (code) => {
      const icon = code === 0 ? "✅" : "❌";
      console.log(`${icon} Sync completed (exit code ${code})\n`);
    });
  }, 500);
});
