const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, array) {
  var diffs = [];

  for (let i = 1; i < array.length; i++) {
    diffs.push(array[i] - array[i - 1]);
  }

  var ans = [];
  array.forEach((el, index) => {
    var sumr = 0;
    var addr = 0;
    for (let i = index; i < diffs.length; i++) {
      addr = addr + diffs[i];
      sumr += addr;
    }

    var suml = 0;
    var addl = 0;
    for (let j = index - 1; j >= 0; j--) {
      addl = addl + diffs[j];
      suml += addl;
    }

    ans.push(sumr + suml);
  });

  return ans.join(" ");
}

function parseData(strings) {
  var N = +strings[0];
  var array = strings[1]
    .split(" ")
    .filter((v) => v !== "")
    .map(Number);

  return [N, array];
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
