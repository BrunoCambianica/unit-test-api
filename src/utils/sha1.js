let crypto = require("crypto");

module.exports = text => {
  let generator = crypto.createHash("sha1");
  generator.update(text);
  return generator.digest("hex");
};
