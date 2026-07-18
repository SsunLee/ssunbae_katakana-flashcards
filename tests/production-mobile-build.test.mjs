import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

test("Appflow build selects production ads", () => {
  const script = packageJson.scripts["appflow:build"];
  assert.match(script, /NEXT_PUBLIC_APP_ENV=production/);
  assert.match(script, /NEXT_PUBLIC_ADMOB_BANNER_ID=ca-app-pub-2330147867465531\/5805463890/);
  assert.match(script, /NEXT_PUBLIC_ADMOB_ANDROID_BANNER_ID=ca-app-pub-2330147867465531\/7036534068/);
});

test("Android release sync has an explicit production build path", () => {
  const script = packageJson.scripts["mobile:sync:android:release"];
  assert.equal(typeof script, "string");
  assert.match(script, /mobile:build:production/);
});

test("mobile builds use the live production API", () => {
  assert.match(packageJson.scripts["mobile:build"], /NEXT_PUBLIC_API_BASE_URL=https:\/\/ssunedu\.com/);
});
