const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, array, x) {
  var less = partition(array, x);

  return [less, array.length - less].join("\n");

  function partition(array, x) {
    var left = 0;
    var right = array.length - 1;
    while (left <= right) {
      while (array[left] < x) {
        left++;
      }

      while (array[right] >= x) {
        right--;
      }

      if (left >= right) break;

      if (left < right) {
        [array[left], array[right]] = [array[right], array[left]];
      }
    }

    return left;
  }
}

function parseData(strings) {
  var N = +strings[0];

  var array = strings[1]
    .split(" ")
    .filter((str) => str !== "")
    .map(Number);

  var x = +strings[2];

  return [N, array, x];
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
