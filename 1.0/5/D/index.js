const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(n, r, array) {
  array = array.map((v) => v - array[0]);

  var left = 0,
    right = 0;

  var ans = 0;

  while (right < n) {
    if (array[right] - array[left] > r) {
      ans += n - right;
      left++;
    } else {
      right++;
    }
  }

  return ans;
}

function parseData(strings) {
  var [n, r] = strings[0].split(" ").map(Number);

  var array = strings[1].split(" ").map(Number);

  return [n, r, array];
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
