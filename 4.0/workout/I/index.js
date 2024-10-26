const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(string) {
  if (string.length % 2 !== 0) {
    return "no";
  }

  var stack = [];

  for (let i = 0; i < string.length; i++) {
    const bracket = string[i];

    if (bracket === "(" || bracket === "[" || bracket === "{") {
      stack.push(bracket);
    } else if (
      (bracket === ")" && stack[stack.length - 1] !== "(") ||
      (bracket === "]" && stack[stack.length - 1] !== "[") ||
      (bracket === "}" && stack[stack.length - 1] !== "{")
    ) {
      return "no";
    } else {
      stack.pop();
    }
  }

  if (stack.length !== 0) {
    return "no";
  }

  return "yes";
}

function parseData(string) {
  return string;
}

function readFile(fileName) {
  var inputPath = path.resolve(__dirname, fileName);
  var fileContent = fs.readFileSync(inputPath, "utf8");

  return fileContent.toString().split("\n");
}

function writeToFile(data, fileName) {
  var outputPath = path.resolve(__dirname, fileName);
  fs.writeFileSync(outputPath, data.toString());
}
