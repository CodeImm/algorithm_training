const { count } = require("console");
const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(string) {
  var strLength = string.length;
  var p = 1000037;
  var x_ = 257;
  var x1_ = 553;

  var h = [];
  h.push(0);
  var h1 = [];
  h1.push(0);

  var x = [];
  x.push(1);
  var x1 = [];
  x1.push(1);

  string = " ".concat(string);

  for (let i = 1; i <= strLength; i++) {
    h.push((h[i - 1] * x_ + string[i].charCodeAt(0)) % p);
    x.push((x[i - 1] * x_) % p);

    h1.push((h1[i - 1] * x1_ + string[i].charCodeAt(0)) % p);
    x1.push((x1[i - 1] * x1_) % p);
  }

  var maxPrefixLength = 0;

  for (let i = 1; i < strLength; i++) {
    if (isEqual(1, strLength - i + 1, i) && i > maxPrefixLength) {
      maxPrefixLength = i;
    }
  }

  var baseLength =
    maxPrefixLength === 0 ? strLength : strLength - maxPrefixLength;

  return baseLength;

  function isEqual(from1, from2, slen) {
    return (
      (h[from1 + slen - 1] + h[from2 - 1] * x[slen]) % p ===
        (h[from2 + slen - 1] + h[from1 - 1] * x[slen]) % p &&
      (h1[from1 + slen - 1] + h1[from2 - 1] * x1[slen]) % p ===
        (h1[from2 + slen - 1] + h1[from1 - 1] * x1[slen]) % p
    );
  }
}

function parseData(strings) {
  return strings;
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
