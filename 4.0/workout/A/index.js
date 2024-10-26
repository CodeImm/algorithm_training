const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(array, intervals) {
  var ans = [];

  intervals.forEach(([l, r]) => {
    var min = array[l];
    var max = array[l];
    for (let i = l + 1; i < r + 1; i++) {
      if (array[i] > max) {
        max = array[i];
      } else if (array[i] < min) {
        min = array[i];
      }
    }

    if (min === max) {
      ans.push("NOT FOUND");
    } else {
      ans.push(max);
    }
  });

  return ans.join("\n");
}

function parseData(strings) {
  var [N, M] = strings.splice(0, 1)[0].split(" ").map(Number);

  var array = strings.splice(0, 1)[0].split(" ").splice(0, N).map(Number);

  var intervals = strings.splice(0, M).map((v) => v.split(" ").map(Number));

  return [array, intervals];
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
