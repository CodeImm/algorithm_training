const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(n, k, array) {
  var map = new Map();

  array.forEach((element) => {
    map.set(element, (map.get(element) || 0) + 1);
  });

  var keys = [...map.keys()].sort((a, b) => a - b);

  var ans = 0;
  var right = 0;
  var duplicates = 0;
  for (let left = 0; left < keys.length; left++) {
    while (right < keys.length && keys[left] * k >= keys[right]) {
      if (map.get(keys[right]) >= 2) {
        duplicates += 1;
      }

      right++;
    }
    var rangeLength = right - left;

    if (map.get(keys[left]) >= 2) {
      ans += (rangeLength - 1) * 3;
    }
    if (map.get(keys[left]) >= 3) {
      ans += 1;
    }
    ans += (((rangeLength - 1) * (rangeLength - 2)) / 2) * 6;

    if (map.get(keys[left]) >= 2) {
      duplicates -= 1;
    }
    ans += duplicates * 3;
  }

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
