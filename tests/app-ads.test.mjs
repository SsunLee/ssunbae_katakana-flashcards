import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appAds = await readFile(new URL("../public/app-ads.txt", import.meta.url), "utf8");

test("app-ads.txt declares the AdMob publisher account", () => {
  assert.equal(
    appAds.trim(),
    "google.com, pub-2330147867465531, DIRECT, f08c47fec0942fa0",
  );
});
