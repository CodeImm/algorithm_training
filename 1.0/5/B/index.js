const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, K, array) {
  var right = 0,
    left = 0;
  var ans = 0;

  let sum = 0;

  while (right < N) {
    sum += array[right];

    while (sum > K) {
      sum -= array[left];
      left++;
    }

    if (sum === K) {
      ans += 1;
      sum -= array[left];
      left++;
    }

    right++;
  }

  return ans;
}

function parseData(strings) {
  var [N, K] = strings[0].split(" ").map(Number);
  var array = strings[1].split(" ").map(Number);

  return [N, K, array];
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
