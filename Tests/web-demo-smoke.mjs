import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(import.meta.dirname, "..");
const paths = {
  html: resolve(root, "Builds/web-demo/index.html"),
  css: resolve(root, "Builds/web-demo/styles.css"),
  js: resolve(root, "Builds/web-demo/game.js"),
  webReadme: resolve(root, "Builds/web-demo/README.md"),
  config: resolve(root, "Data/config/web_demo_balance.json"),
  server: resolve(root, "Tools/web-demo-server.mjs")
};

for (const [name, path] of Object.entries(paths)) {
  assert.equal(existsSync(path), true, `${name} is missing: ${path}`);
}

const html = readFileSync(paths.html, "utf8");
assert.match(html, /shiren-like Web Demo/, "HTML title should identify the demo");
assert.match(html, /game-canvas/, "HTML should include the main canvas");
assert.match(html, /styles\.css/, "HTML should load styles.css");
assert.match(html, /game\.js/, "HTML should load game.js");
assert.match(html, /console-button/, "HTML should keep the Console entry");
assert.match(html, /camera-controls/, "HTML should include camera controls");
assert.match(html, /camera-reset-button/, "HTML should include camera reset");
assert.match(html, /camera-copy-button/, "HTML should include camera copy action");
assert.match(html, /camera-json-output/, "HTML should include camera JSON output");

const css = readFileSync(paths.css, "utf8");
assert.match(css, /console-section/, "CSS should style the new console section");
assert.match(css, /camera-controls/, "CSS should style the camera controls");
assert.match(css, /camera-slider/, "CSS should style the camera sliders");
assert.match(css, /camera-json-output/, "CSS should style the camera JSON output");

const webReadme = readFileSync(paths.webReadme, "utf8");
assert.match(webReadme, /v0\.4\.3 \/ 玩家中心镜头 \+ Console 视野调参版/, "web demo README should describe v0.4.3 status");
assert.match(webReadme, /风来的西林|玩家中心镜头/, "web demo README should describe the player-centered camera");
assert.match(webReadme, /不再使用房间中心作为主镜头目标/, "web demo README should say the room center is no longer the primary camera target");
assert.match(webReadme, /Console/, "web demo README should mention the console tuning panel");
assert.match(webReadme, /tileW/, "web demo README should mention tileW");
assert.match(webReadme, /tileH/, "web demo README should mention tileH");
assert.match(webReadme, /yScale/, "web demo README should mention yScale");
assert.match(webReadme, /rowStep/, "web demo README should mention rowStep");
assert.match(webReadme, /perspectiveOffset/, "web demo README should mention perspectiveOffset");

const js = readFileSync(paths.js, "utf8");
assert.match(js, /cameraControls/, "JS should reference the camera controls container");
assert.match(js, /cameraReset/, "JS should include a camera reset control");
assert.match(js, /cameraCopy/, "JS should include a camera copy control");
assert.match(js, /cameraJson/, "JS should include a camera JSON output");
assert.match(js, /CAMERA_FIELDS/, "JS should declare tunable camera fields");
assert.match(js, /getCameraDefaults/, "JS should derive camera defaults");
assert.match(js, /buildCameraControls/, "JS should build camera controls");
assert.match(js, /updateCameraConsole/, "JS should refresh the camera console UI");
assert.match(js, /setCameraField/, "JS should handle camera field updates");
assert.match(js, /resetCameraSession/, "JS should reset camera parameters");
assert.match(js, /copyCameraSession/, "JS should expose camera parameter copy");
assert.match(js, /getCameraTarget/, "JS should compute a camera target");
assert.match(js, /x:\s*state\.player\.x[\s\S]*y:\s*state\.player\.y/, "getCameraTarget should center on the player");
assert.doesNotMatch(js, /cameraTarget = currentRoom\.center/, "JS should not target the room center as the main camera");
assert.match(js, /cameraCenterOffsetX/, "JS should support cameraCenterOffsetX");
assert.match(js, /cameraCenterOffsetY/, "JS should support cameraCenterOffsetY");
assert.match(js, /cameraZoom/, "JS should support cameraZoom");
assert.match(js, /placeMonstersByRoom/, "JS should keep room-based monster placement");
assert.match(js, /generateDungeon/, "JS should keep random dungeon generation");
assert.match(js, /rooms/, "JS should keep room metadata");
assert.match(js, /hunger/i, "JS should keep hunger logic");
assert.match(js, /satiety/i, "JS should keep satiety logic");
assert.match(js, /teleport/i, "JS should keep teleport logic");
assert.match(js, /sleep/i, "JS should keep sleep logic");
assert.match(js, /fireball/i, "JS should keep fireball logic");
assert.match(js, /swap/i, "JS should keep swap logic");
assert.match(js, /minimap/i, "JS should keep minimap logic");
assert.match(js, /enemyList/, "JS should keep the enemy panel logic");

const config = JSON.parse(readFileSync(paths.config, "utf8"));
assert.equal(config.version, "v0.4.3", "config should be v0.4.3");
assert.equal(config.camera.cameraMode, "traditional-tilt", "camera mode should stay traditional tilt");
assert.equal(config.camera.tileW, 104, "config should include tileW");
assert.equal(config.camera.tileH, 104, "config should include tileH");
assert.equal(config.camera.yScale, 0.72, "config should include yScale");
assert.equal(config.camera.rowStep, 75, "config should include rowStep");
assert.equal(config.camera.perspectiveOffset, 2, "config should include perspectiveOffset");
assert.equal(config.camera.tileDepth, 22, "config should include tileDepth");
assert.equal(config.camera.cameraZoom, 1, "config should include cameraZoom");
assert.equal(config.camera.cameraCenterOffsetX, 0, "config should include cameraCenterOffsetX");
assert.equal(config.camera.cameraCenterOffsetY, 0, "config should include cameraCenterOffsetY");

const forbiddenCoreTerms = [
  "treeCost",
  "wallCost",
  "towerCost",
  "landmarkCost",
  "workers",
  "archers"
];

for (const term of forbiddenCoreTerms) {
  assert.equal(js.includes(term), false, `JS should not keep old core term: ${term}`);
}

console.log("v0.4.3 shiren-like player camera console tuning smoke test passed");
