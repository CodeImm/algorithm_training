const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(k, n, array) {
  var ans = 0n;
  for (let i = 0; i < n; i++) {
    ans += array[i] >= k ? BigInt(Math.floor(array[i] / k) * (i + 1) * 2) : 0n;

    array[i] = array[i] >= k ? array[i] % k : array[i];
  }

  var free = k;
  for (let i = n - 1; i >= 0; i--) {
    if (array[i] !== 0) {
      if (free !== k) {
        if (free - array[i] > 0) {
          free -= array[i];
        } else if (free - array[i] === 0) {
          free = k;
        } else if (free - array[i] < 0) {
          ans += BigInt((i + 1) * 2);
          free = k - (array[i] - free);
        }
      } else if (free === k) {
        free -= array[i];
        ans += BigInt((i + 1) * 2);
      }
      array[i] = 0;
    }
  }

  return ans;
}

function parseData(strings) {
  var k = +strings[0];
  var n = +strings[1];

  var array = strings.splice(2, n).map(Number);

  return [k, n, array];
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
