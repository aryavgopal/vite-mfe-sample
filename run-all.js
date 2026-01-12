const { spawnSync, spawn } = require("child_process");
const path = require("path");

const apps = ["shared", "remote", "hello-world-remote", "host"];

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    cwd,
    shell: true,
  });

  if (result.status !== 0) {
    process.exit(result.status);
  }
}

function runBackground(command, args, cwd) {
  const child = spawn(command, args, {
    stdio: "inherit",
    cwd,
    shell: true,
  });

  child.on("error", (err) => {
    console.error(`Error starting ${command} in ${cwd}:`, err);
  });

  return child;
}

for (const app of apps) {
  run("npm", ["install", "--no-workspaces"], path.join(__dirname, app));
}

console.log("\nStarting all dev servers...\n");

for (const app of apps) {
  console.log(`Starting ${app}...`);
  runBackground("npm", ["run", "dev"], path.join(__dirname, app));
}
