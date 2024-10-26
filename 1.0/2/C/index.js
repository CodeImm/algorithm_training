const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [length, array, x] = fileContent.toString().split("\n");

function getResult(array, x) {
  var mindiff = 3000;
  var value = null;

  for (let i = 0; i < array.length; i++) {
    let diff = Math.abs(x - array[i]);

    if (diff < mindiff) {
      value = array[i];
      mindiff = diff;
    }
  }

  return value;
}

var result = getResult(array.split(" ").map(Number), Number(x));

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
