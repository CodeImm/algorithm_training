const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var text = fileContent.toString();

var result = getResult(text);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(text) {
  var text = new Set(text.split(/[\s+\n+]/).filter((v) => v !== ""));

  return text.size;
}
