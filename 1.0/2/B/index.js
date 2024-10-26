const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var array = fileContent.toString().split("\n").map(Number);
var endIndex = array.findIndex((val) => val === -2000000000);
array = array.slice(0, -(array.length - endIndex));

function getResult(array) {
  var seqtype = null;

  for (let i = 1; i < array.length; i++) {
    if (array[i] === array[i - 1]) {
      seqtype =
        seqtype === "DESCENDING"
          ? "WEAKLY DESCENDING"
          : seqtype === "ASCENDING"
          ? "WEAKLY ASCENDING"
          : seqtype ?? "CONSTANT";
    }
    if (array[i] > array[i - 1]) {
      seqtype =
        seqtype === null || seqtype === "ASCENDING"
          ? "ASCENDING"
          : seqtype === "WEAKLY ASCENDING" || seqtype === "CONSTANT"
          ? "WEAKLY ASCENDING"
          : "RANDOM";
    }
    if (array[i] < array[i - 1]) {
      seqtype =
        seqtype === null || seqtype === "DESCENDING"
          ? "DESCENDING"
          : seqtype === "WEAKLY DESCENDING" || seqtype === "CONSTANT"
          ? "WEAKLY DESCENDING"
          : "RANDOM";
    }
  }

  return seqtype ?? "CONSTANT";
}

var result = getResult(array);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
