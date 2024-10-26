const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [N, ...array] = fileContent.toString().split("\n");
var formatedArray = [];

for (let i = 0; i < N; i++) {
  formatedArray.push(
    array[i]
      .split(" ")
      .filter((v) => /\d/.test(v))
      .map(Number)
  );
}
var result = getResult(N, formatedArray);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(N, array) {
  var set = new Set();

  array.forEach((el) => {
    set.add(el[0]);
  });

  return set.size;
}
