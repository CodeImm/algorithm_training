const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(x1, y1, x2, y2) {
  var r1 = Math.sqrt(x1 * x1 + y1 * y1);
  var r2 = Math.sqrt(x2 * x2 + y2 * y2);

  if (r1 === 0 && r2 === 0) {
    return 0;
  } else if (r1 === 0 || r2 === 0) {
    return r1 + r2;
  }

  if (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) === 0) {
    return 0;
  } else if (r1 === 0 || r2 === 0) {
    return r1 + r2;
  }

  let secLength = arcLength(x1, y1, x2, y2, Math.min(r1, r2));

  let lineLength = Math.abs(r1 - r2);

  return Math.min(r1 + r2, lineLength + secLength);

  function arcLength(x1, y1, x2, y2, radius) {
    let angle = Math.abs(Math.atan2(y2, x2) - Math.atan2(y1, x1));

    return radius * angle;
  }
}

function parseData(strings) {
  var [x1, y1, x2, y2] = strings[0].split(" ").map(Number);

  return [x1, y1, x2, y2];
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
