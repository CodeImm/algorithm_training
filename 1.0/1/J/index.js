const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [a, b, c, d, e, f] = fileContent.toString().split("\n").map(Number);

function getResult(a, b, c, d, e, f) {
  var D = a * d - c * b;

  if (D === 0) {
    // 1 ✅
    if (
      a !== 0 &&
      b !== 0 &&
      c !== 0 &&
      d !== 0 &&
      e / b === f / d &&
      a / b === c / d
    ) {
      return [1, -a / b, e / b].join(" ");
    }

    // 3 ✅
    if (b === 0 && d === 0 && a !== 0 && c !== 0 && e / a === f / c) {
      return [3, e / a].join(" ");
    }

    // 4 ✅
    if (a === 0 && c === 0 && b !== 0 && d !== 0 && e / b === f / d) {
      return [4, e / b].join(" ");
    }

    // 5 ✅
    if (a === b && b === c && c === d && d === e && e === f && f === 0) {
      return 5;
    }

    // 0 ✅
    return 0;
  }

  var Dx = e * d - f * b;
  var Dy = a * f - c * e;

  // 2
  return [2, (Dx / D).toFixed(5), (Dy / D).toFixed(5)].join(" ");
}

var result = getResult(a, b, c, d, e, f);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
