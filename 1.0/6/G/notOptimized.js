const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(n, k, array) {
  array.sort((a, b) => a - b);

  var ans = 0;

  var triplets = new Set();

  for (let left = 0; left < n - 2; left++) {
    for (
      let middle = left + 1;
      middle < n - 1 && array[left] * k >= array[middle];
      middle++
    ) {
      for (
        let right = middle + 1;
        right < n &&
        array[middle] * k >= array[right] &&
        array[left] * k >= array[right];
        right++
      ) {
        triplets.add([array[left], array[middle], array[right]].join("."));
      }
    }
  }

  triplets.forEach((s) => {
    let size = new Set(s.split(".")).size;

    if (size === 3) {
      ans += 6;
    } else if (size === 2) {
      ans += 3;
    } else if (size === 1) {
      ans += 1;
    }
  });
  return ans;
}

function parseData(strings) {
  var [n, k] = strings[0].split(" ").map(Number);

  var array = strings[1].split(" ").map(Number);

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
