import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const variables = await readFile(
  new URL("../android/variables.gradle", import.meta.url),
  "utf8",
);
const rootBuild = await readFile(
  new URL("../android/build.gradle", import.meta.url),
  "utf8",
);
const appBuild = await readFile(
  new URL("../android/app/build.gradle", import.meta.url),
  "utf8",
);

test("Android build compiles and targets API 36", () => {
  assert.match(variables, /compileSdkVersion\s*=\s*36/);
  assert.match(variables, /targetSdkVersion\s*=\s*36/);
  assert.match(variables, /buildToolsVersion\s*=\s*["']36\.0\.0["']/);
  assert.match(appBuild, /buildToolsVersion\s+rootProject\.ext\.buildToolsVersion/);
});

test("Android Gradle Plugin supports API 36", () => {
  assert.match(rootBuild, /com\.android\.tools\.build:gradle:8\.10\.1/);
  assert.match(
    rootBuild,
    /project\.android\.buildToolsVersion\s+rootProject\.ext\.buildToolsVersion/,
  );
});

test("Android release uses a new Play version code", () => {
  assert.match(appBuild, /versionCode\s+3\b/);
});
