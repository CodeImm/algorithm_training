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

  for (let left = 0; left < map.size; left++) {
    let middle = left;
    while (middle < map.size && keys[left] * k >= keys[middle]) {
      let right = middle;
      while (
        right < map.size &&
        keys[middle] * k >= keys[right] &&
        keys[left] * k >= keys[right]
      ) {
        if (left === middle && middle === right && map.get(keys[left]) >= 3) {
          ans += 1;
        } else if (
          (left === middle && middle !== right && map.get(keys[left]) >= 2) ||
          (left !== middle && middle === right && map.get(keys[middle]) >= 2)
        ) {
          ans += 3;
        } else if (left !== middle && middle !== right) {
          ans += 6;
        }

        right++;
      }

      middle++;
    }
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
