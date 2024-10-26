const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var array = fileContent.toString().split(" ").map(Number);

function getResult(array) {
  if (array.length < 3) {
    return 0;
  }

  var count = 0;

  for (let i = 1; i < array.length - 1; i++) {
    if (array[i] > array[i + 1] && array[i] > array[i - 1]) {
      count++;
    }
  }

  return count;
}

var result = getResult(array);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
