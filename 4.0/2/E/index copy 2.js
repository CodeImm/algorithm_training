const { count } = require("console");
const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(parseData(strings));

writeToFile(result, "output.txt");

function getResult(string) {
  var strLength = string.length;
  var p = 10000079;

  var x_ = 357;

  var h = [];
  h.push(0);
  var h1 = [];
  h1.push(0);

  var x = [];
  x.push(1);

  string = " ".concat(string);

  for (let i = 1; i <= strLength; i++) {
    h.push((h[i - 1] * x_ + string[i].charCodeAt(0)) % p);
    h1.push((h1[i - 1] * x_ + string[strLength - i + 1].charCodeAt(0)) % p);

    x.push((x[i - 1] * x_) % p);
  }

  var ans = 0;

  for (let i = 1; i <= strLength; i++) {
    let diff = Math.min(i - 1, strLength - i);
    let from = i - diff;
    let slen = 2 * diff + 1;
    while (
      i - diff >= 1 &&
      from >= 1 &&
      from + slen - 1 <= strLength &&
      !isEqual(from, strLength - from - slen + 2, slen)
    ) {
      diff--;
      from = i - diff;
      slen = 2 * diff + 1;
    }

    ans += Math.floor((slen + 1) / 2);

    let j = i + 1;
    if (j <= strLength && isEqual(i, strLength - i, 2)) {
      let diff = Math.min(i - 1, strLength - i - 1);
      let from = i - diff;
      let slen = 2 * diff + 2;
      while (
        i - diff >= 1 &&
        from + slen - 1 <= strLength &&
        !isEqual(from, strLength - from - slen + 2, slen)
      ) {
        diff--;
        from = i - diff;
        slen = 2 * diff + 2;
      }
      ans += Math.floor(slen / 2);
    }
  }

  return ans;

  function isEqual(from1, from2, slen) {
    return (
      (h[from1 + slen - 1] + h1[from2 - 1] * x[slen]) % p ===
      (h1[from2 + slen - 1] + h[from1 - 1] * x[slen]) % p
    );
  }
}

function parseData(strings) {
  return Array.isArray(strings) ? strings[0] : strings;
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
