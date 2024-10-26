const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(n, k, array) {
  var alphabet = {};

  var startIndex = 0;
  var maxLength = 0;

  var left = 0,
    right = 0;
  while (right < n) {
    while (
      right < n &&
      (!alphabet[array[right]] || alphabet[array[right]] < k)
    ) {
      alphabet[array[right]] = (alphabet[array[right]] || 0) + 1;

      right++;
    }

    if (right - left > maxLength) {
      maxLength = right - left;
      startIndex = left;
    }

    while (alphabet[array[right]] >= k) {
      alphabet[array[left]] -= 1;
      left++;
    }
  }

  return [maxLength, startIndex + 1].join(" ");
}

function parseData(strings) {
  var [n, k] = strings[0].split(" ").map(Number);

  var array = strings[1];

  return [n, k, array];
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
