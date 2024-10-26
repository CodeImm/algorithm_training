const { count } = require("console");
const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(string) {
  var strLength = string.length;
  var p = 1000037;
  // var p = 1000000007;
  var x_ = 357;
  var x1_ = 259;

  var h = [];
  h.push(0);
  var h1 = [];
  h1.push(0);
  var h2 = [];
  h2.push(0);
  var h3 = [];
  h3.push(0);

  var x = [];
  x.push(1);
  var x1 = [];
  x1.push(1);

  string = " ".concat(string);

  for (let i = 1; i <= strLength; i++) {
    h.push((h[i - 1] * x_ + string[i].charCodeAt(0)) % p);
    h1.push((h1[i - 1] * x_ + string[strLength - i + 1].charCodeAt(0)) % p);

    h2.push((h2[i - 1] * x1_ + string[i].charCodeAt(0)) % p);
    h3.push((h3[i - 1] * x1_ + string[strLength - i + 1].charCodeAt(0)) % p);

    x.push((x[i - 1] * x_) % p);

    x1.push((x1[i - 1] * x1_) % p);
  }

  var ans = 0;
  // длина подстроки
  for (let slen = 2; slen <= strLength; slen++) {
    // from
    for (let from = 1; from + slen - 1 <= strLength; from++) {
      if (isEqual(from, strLength - from - slen + 2, slen)) {
        ans++;
      }
    }
  }

  return ans + strLength;

  function isEqual(from1, from2, slen) {
    return (
      (h[from1 + slen - 1] + h1[from2 - 1] * x[slen]) % p ===
        (h1[from2 + slen - 1] + h[from1 - 1] * x[slen]) % p &&
      (h2[from1 + slen - 1] + h3[from2 - 1] * x1[slen]) % p ===
        (h3[from2 + slen - 1] + h2[from1 - 1] * x1[slen]) % p
    );
  }
}

function parseData(strings) {
  return Array.isArray(strings) ? [strings[0]] : [strings];
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
