const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var array = fileContent
  .toString()
  .split(" ")
  .filter((v) => v !== "")
  .map(Number);

function getResult(array) {
  var max1 = array[0];
  var max2 = array[1];
  var min1 = array[0];
  var min2 = array[1];

  for (let i = 2; i < array.length; i++) {
    if (array[i] > max1 && max2 > 0 && max1 < max2) {
      max1 = array[i];
    } else if (array[i] > max2) {
      max2 = array[i];
    }

    if (array[i] < 0) {
      if (array[i] < min1 && min2 < 0 && min1 > min2) {
        min1 = array[i];
      } else if (array[i] < min2) {
        min2 = array[i];
      }
    }
  }

  if (min1 * min2 > max1 * max2) {
    return (min1 < min2 ? [min1, min2] : [min2, min1]).join(" ");
  } else {
    return (max1 < max2 ? [max1, max2] : [max2, max1]).join(" ");
  }
}

var result = getResult(array);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
