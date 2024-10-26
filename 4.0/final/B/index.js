const { count } = require("console");
const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, string) {
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

  var reversed = " ".concat([...string].reverse().join());
  string = " ".concat(string);

  for (let i = 1; i <= strLength; i++) {
    h.push((h[i - 1] * x_ + string[i].charCodeAt(0)) % p);
    x.push((x[i - 1] * x_) % p);

    h1.push((h1[i - 1] * x1_ + reversed[strLength - i + 1].charCodeAt(0)) % p);
    x1.push((x1[i - 1] * x1_) % p);
  }

  var z = [1];

  for (let i = 2; i <= strLength; i++) {
    let j = 1;
    let k = i + 1;
    while (
      (j <= strLength - i + 1 || k >= 1) &&
      (isEqual(1, i, k) || isEqual(1, i, j))
    ) {
      if (isEqual(1, i, k)) {
        j = k + 1;
        break;
      }
      j++;
      k--;
    }
    z.push(j - 1);
  }

  return z.join(" ");

  function isEqual(from1, from2, slen) {
    from2 = strLength - from2 + 1;
    console.log(from2, slen);
    return (
      (h[from1 + slen - 1] + h1[from2 - 1] * x[slen]) % p ===
      (h1[from2 + slen - 1] + h[from1 - 1] * x[slen]) % p
    );
  }
}

function parseData(strings) {
  var N = +strings[0];
  var string = strings[1];
  return [N, string];
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
