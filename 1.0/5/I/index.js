const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(n, array) {
  var ans = 0;

  var left = 0,
    right = n;

  while (left < array.length - n + 1) {
    var count = 0;
    while (array[right] === array[left + count]) {
      count++;
      right++;
    }

    ans += ((right - left - n + 1) * count) / 2;
    console.log(left, "  ", right, "  ", ((right - left - n + 1) * count) / 2);
    left = right - n + 1;
    right++;
  }
  console.log(ans);
  return ans;
}

function parseData(strings) {
  var n = +strings[0];

  var array = strings[1];

  return [n, array];
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
