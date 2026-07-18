import assert from "node:assert/strict";
import test from "node:test";

let policyModule = null;
try {
  policyModule = await import("../app/lib/registrationPolicy.ts");
} catch {
  // The first red run intentionally reaches this assertion before implementation.
}

test("registration policy module exists", () => {
  assert.ok(policyModule, "registrationPolicy.ts must be implemented");
});
test("allows a user on their 14th birthday", () => {
  assert.equal(
    policyModule?.isAtLeastAge("2012-07-18", 14, new Date("2026-07-18T12:00:00+09:00")),
    true,
  );
});

test("rejects a user one day before their 14th birthday", () => {
  assert.equal(
    policyModule?.isAtLeastAge("2012-07-19", 14, new Date("2026-07-18T12:00:00+09:00")),
    false,
  );
});

test("rejects invalid and future birth dates", () => {
  const today = new Date("2026-07-18T12:00:00+09:00");
  assert.equal(policyModule?.isAtLeastAge("not-a-date", 14, today), false);
  assert.equal(policyModule?.isAtLeastAge("2027-01-01", 14, today), false);
});
