var fs = require("fs");
var path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var array = fileContent
  .toString()
  .split(" ")
  .filter(function deleteEmptyStrings(string) {
    return string !== "" && string !== "\n";
  })
  .map(Number);
console.log(array);
var result = getResult(array);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(array) {
  if (array.length <= 3) {
    return array.join(" ");
  }

  var max1 = -Infinity;
  var max2 = -Infinity;
  var max3 = -Infinity;

  var min1 = Infinity;
  var min2 = Infinity;

  for (let i = 0; i < array.length; i++) {
    if (array[i] > max1) {
      max3 = max2;
      max2 = max1;
      max1 = array[i];
    } else if (array[i] > max2) {
      max3 = max2;
      max2 = array[i];
    } else if (array[i] > max3) {
      max3 = array[i];
    }

    if (array[i] < min1) {
      min2 = min1;
      min1 = array[i];
    } else if (array[i] < min2) {
      min2 = array[i];
    }
  }

  return (
    max1 * max2 * max3 > min1 * min2 * max1
      ? [max1, max2, max3]
      : [min1, min2, max1]
  ).join(" ");
}
