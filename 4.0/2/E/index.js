const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(string) {
  var strLength = string.length;

  var isPalindrome = isPalindromeCached(string);

  var oddCount = 0;
  for (let i = 1; i <= strLength; i++) {
    // mindiff, maxdiff
    let left = 0,
      right = Math.min(i - 1, strLength - i);

    oddCount += rbinsearch(i, left, right);
  }

  var evenCount = 0;
  for (let i = 1; i <= strLength - 1; i++) {
    // mindiff, maxdiff
    let left = 0,
      right = Math.min(i - 1, strLength - i - 1);

    evenCount += rbinsearch(i, left, right, true);
  }

  return oddCount + evenCount;

  function rbinsearch(i, left, right, isEven = false) {
    let middle;
    while (left <= right) {
      middle = Math.floor((left + right) / 2);
      let from = i - middle;
      let to = i + middle + (isEven ? 1 : 0);

      if (isPalindrome(from, to)) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }

    return left;
  }

  function isPalindromeCached(string) {
    var strLength = string.length;
    var p = 10000079;

    var x_ = 357;
    var x1_ = 553;

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

    // [L, R]
    return function isPalindrome(L, R) {
      var slen = R - L + 1;
      var L2 = strLength - L - slen + 2;
      return (
        (h[L + slen - 1] + h1[L2 - 1] * x[slen]) % p ===
          (h1[L2 + slen - 1] + h[L - 1] * x[slen]) % p &&
        (h2[L + slen - 1] + h3[L2 - 1] * x1[slen]) % p ===
          (h3[L2 + slen - 1] + h2[L - 1] * x1[slen]) % p
      );
    };
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
