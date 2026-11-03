const assert = require("node:assert/strict");
const { test } = require("node:test");
const {
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  isValidContactSubject,
} = require("../lib/contact-validation.js");

test("validates names after trimming whitespace and enforcing the limit", () => {
  assert.equal(isValidContactName(" Aashish "), true);
  assert.equal(isValidContactName("   "), false);
  assert.equal(isValidContactName("a".repeat(101)), false);
  assert.equal(isValidContactName(null), false);
});

test("validates email format and maximum length", () => {
  assert.equal(isValidContactEmail("person@example.com"), true);
  assert.equal(isValidContactEmail("not-an-email"), false);
  assert.equal(isValidContactEmail("person@localhost"), false);
  assert.equal(isValidContactEmail(`a@${"b".repeat(250)}.com`), false);
  assert.equal(isValidContactEmail(null), false);
});

test("validates subject and message after trimming whitespace", () => {
  assert.equal(isValidContactSubject(" Project inquiry "), true);
  assert.equal(isValidContactSubject(" ".repeat(3)), false);
  assert.equal(isValidContactSubject("s".repeat(151)), false);
  assert.equal(isValidContactMessage(" Please contact me. "), true);
  assert.equal(isValidContactMessage("  "), false);
  assert.equal(isValidContactMessage("m".repeat(5001)), false);
  assert.equal(isValidContactSubject(null), false);
  assert.equal(isValidContactMessage(null), false);
});
