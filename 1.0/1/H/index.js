const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [a, b, n, m] = fileContent.toString().split("\n").map(Number);

function getResult(a, b, n, m) {
  if ((a < b && n < m) || (b < a && m < n)) {
    return -1;
  }

  var at = n * 1 + (n - 1) * a;
  var bt = m * 1 + (m - 1) * b;

  var mint = Math.max(at, bt);

  var maxt = Math.min(at + 2 * a, bt + 2 * b);

  return [mint, maxt].join(" ");
}

var result = getResult(a, b, n, m);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
