const assert = require("node:assert/strict");
const { test } = require("node:test");
const { getEmailJsConfig } = require("../lib/emailjs-config.js");

test("returns null when EmailJS configuration is missing", () => {
  assert.equal(getEmailJsConfig({}), null);
});

test("returns null when any required EmailJS setting is missing", () => {
  const config = {
    serviceId: "service",
    templateId: "template",
    publicKey: "key",
  };

  for (const setting of Object.keys(config)) {
    const incompleteConfig = { ...config };
    delete incompleteConfig[setting];
    assert.equal(getEmailJsConfig(incompleteConfig), null, setting);
  }
});

test("returns null when a setting contains only whitespace", () => {
  assert.equal(
    getEmailJsConfig({
      serviceId: "service",
      templateId: "   ",
      publicKey: "key",
    }),
    null,
  );
});

test("trims and returns complete EmailJS configuration", () => {
  assert.deepEqual(
    getEmailJsConfig({
      serviceId: " service ",
      templateId: " template ",
      publicKey: " key ",
    }),
    {
      serviceId: "service",
      templateId: "template",
      publicKey: "key",
    },
  );
});
