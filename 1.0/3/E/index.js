const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var strings = fileContent.toString().split("\n");
var fingers = strings[0].split(" ").filter((v) => /\d/.test(v));
var number = strings[1];

var result = getResult(number, fingers);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(number, fingers) {
  fingers = new Set(fingers);

  var diffrence = new Set([...number].filter((v) => !fingers.has(v)));

  return diffrence.size;
}
