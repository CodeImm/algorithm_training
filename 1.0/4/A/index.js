const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [n, ...array] = fileContent.toString().split("\n");

var result = getResult(new Number(n), array);
var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(n, array) {
  var dict = {};

  for (let index = 0; index < n; index++) {
    let [word, key] = array[index].split(" ").map((w) => w.trim());

    dict[key] = word;
    dict[word] = key;
  }

  return dict[array[n]];
}
