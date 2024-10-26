const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var [w, h, n] = parseData(strings);

var result = getResult(w, h, n);

writeToFile(result, "output.txt");

function getResult(w, h, n) {
  if (n === 1) {
    return Math.max(w, h);
  }

  temp = Math.min(w, h);
  h = Math.max(w, h);
  w = temp;

  var ans = search(w, h, n);

  return ans;

  function search(w, h, n) {
    let l = h;
    let r = h * n;

    let m;
    while (l < r) {
      m = Math.floor((l + r) / 2);
      if (check(m, w, h, n)) {
        r = m;
      } else {
        l = m + 1;
      }
    }
    return l;
  }

  function check(m, w, h, n) {
    return Math.floor(m / w) * Math.floor(m / h) >= n;
  }
}

function parseData(strings) {
  var [w, h, n] = strings[0].split(" ").map(Number);

  return [w, h, n];
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
