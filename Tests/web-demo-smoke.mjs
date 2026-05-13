import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(import.meta.dirname, "..");
const paths = {
  rootReadme: resolve(root, "README.md"),
  currentTask: resolve(root, "AI_TASKS/CURRENT_TASK.md"),
  nextPrompt: resolve(root, "AI_TASKS/NEXT_CODEX_PROMPT.md"),
  projectBrief: resolve(root, "DESIGN_HUB/01_PROJECT_BRIEF.md"),
  coreGameplay: resolve(root, "DESIGN_HUB/02_CORE_GAMEPLAY.md"),
  decisions: resolve(root, "DESIGN_HUB/09_DECISIONS.md"),
  demoScope: resolve(root, "DESIGN_HUB/12_DEMO_SCOPE.md"),
  webReadme: resolve(root, "Builds/web-demo/README.md"),
  html: resolve(root, "Builds/web-demo/index.html"),
  css: resolve(root, "Builds/web-demo/styles.css"),
  js: resolve(root, "Builds/web-demo/game.js"),
  server: resolve(root, "Tools/web-demo-server.mjs")
};

for (const [name, path] of Object.entries(paths)) {
  assert.equal(existsSync(path), true, `${name} is missing: ${path}`);
}

const rootReadme = readFileSync(paths.rootReadme, "utf8");
assert.match(rootReadme, /^# shiren-like/m, "README should identify the project as shiren-like");
assert.match(rootReadme, /Mystery Dungeon Roguelike/, "README should describe the new Mystery Dungeon direction");
assert.equal(rootReadme.includes("kingdom-like/"), false, "README should not keep the old kingdom-like directory name");

const projectBrief = readFileSync(paths.projectBrief, "utf8");
assert.match(projectBrief, /Mystery Dungeon/, "project brief should mention Mystery Dungeon");
assert.match(projectBrief, /回合制格子迷宫/, "project brief should mention turn-based grid dungeon gameplay");

const coreGameplay = readFileSync(paths.coreGameplay, "utf8");
assert.match(coreGameplay, /格子地图/, "core gameplay should mention grid maps");
assert.match(coreGameplay, /回合制/, "core gameplay should mention turn-based play");
assert.match(coreGameplay, /楼梯/, "core gameplay should mention stairs");

const decisions = readFileSync(paths.decisions, "utf8");
assert.match(decisions, /重定向为 shiren-like/, "decisions should record the project redirection");
assert.match(decisions, /v0\.1/, "decisions should constrain v0.1 scope");

const demoScope = readFileSync(paths.demoScope, "utf8");
assert.match(demoScope, /v0\.1 = 最小可玩迷宫版/, "demo scope should list v0.1");
assert.match(demoScope, /v1\.x = Godot Demo/, "demo scope should keep the Godot stage");

const currentTask = readFileSync(paths.currentTask, "utf8");
assert.match(currentTask, /v0\.0 \/ 项目重定向版/, "current task should be v0.0 redirection");

const nextPrompt = readFileSync(paths.nextPrompt, "utf8");
assert.match(nextPrompt, /Web Demo v0\.1 \/ 最小可玩迷宫版/, "next prompt should target v0.1 playable dungeon");
assert.match(nextPrompt, /格子迷宫/, "next prompt should request grid dungeon gameplay");
assert.match(nextPrompt, /回复药/, "next prompt should request a potion item");
assert.match(nextPrompt, /楼梯/, "next prompt should request stairs");

const webReadme = readFileSync(paths.webReadme, "utf8");
assert.match(webReadme, /shiren-like Web Demo/, "web demo README should be renamed");
assert.match(webReadme, /v0\.0 \/ 项目重定向版/, "web demo README should describe v0.0 status");
assert.match(webReadme, /Web Demo v0\.1 \/ 最小可玩迷宫版/, "web demo README should point to v0.1");

const html = readFileSync(paths.html, "utf8");
assert.match(html, /game-canvas/, "HTML should still include the canvas");
assert.match(html, /styles\.css/, "HTML should load styles.css");
assert.match(html, /game\.js/, "HTML should load game.js");

console.log("v0.0 shiren-like redirection smoke test passed");
