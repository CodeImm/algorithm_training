const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(a, b, c, d) {
  var ans = [];

  var m = a * d + c * b;
  var n = b * d;

  var nodmn = nod(n, m);

  return `${m / nodmn} ${n / nodmn}`;

  function nod(n, m) {
    if (m !== 0) {
      const k = n % m;

      return nod(m, k);
    }

    return n;
  }
}

function parseData(strings) {
  var [a, b, c, d] = strings[0].split(" ").map(Number);

  return [a, b, c, d];
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
