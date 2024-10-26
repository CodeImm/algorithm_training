const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [N, array] = fileContent.toString().split("\n");

function getResult(array) {
  var max = Math.max(...array);

  var isWinnerBeforeExists = array[0] === max;

  var vasiliiResult = null;

  for (let i = 1; i < array.length - 1; i++) {
    if (
      isWinnerBeforeExists &&
      array[i] % 10 !== 0 &&
      array[i] % 5 === 0 &&
      array[i] > array[i + 1]
    ) {
      if (array[i] > vasiliiResult) {
        vasiliiResult = array[i];
      }
    }
    if (!isWinnerBeforeExists && array[i] === max) {
      isWinnerBeforeExists = true;
    }
  }

  if (vasiliiResult === null) {
    return 0;
  }

  return array.sort((a, b) => b - a).findIndex((v) => v === vasiliiResult) + 1;
}

var result = getResult(array.split(" ").map(Number));

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
