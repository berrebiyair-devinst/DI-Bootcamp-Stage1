const fs = require("fs");

function readFile(fileName) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log(data);
  });
}

function writeFile(fileName, content) {
  fs.writeFile(fileName, content, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("File written successfully.");
  });
}

module.exports = {
  readFile,
  writeFile,
};