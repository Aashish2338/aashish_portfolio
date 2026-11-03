const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidContactName(value) {
  if (typeof value !== "string") return false;
  const name = value.trim();
  return name.length > 0 && name.length <= 100;
}

function isValidContactEmail(value) {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    EMAIL_PATTERN.test(value)
  );
}

function isValidContactSubject(value) {
  if (typeof value !== "string") return false;
  const subject = value.trim();
  return subject.length > 0 && subject.length <= 150;
}

function isValidContactMessage(value) {
  if (typeof value !== "string") return false;
  const message = value.trim();
  return message.length > 0 && message.length <= 5000;
}

module.exports = {
  isValidContactName,
  isValidContactEmail,
  isValidContactSubject,
  isValidContactMessage,
};
