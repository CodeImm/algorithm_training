const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [n, ...array] = fileContent.toString().split("\n");
array = array.map((str) => str.split(" ").map(Number));

var result = getResult(n, array);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(n, array) {
  var dict = {};

  for (let i = 0; i < n; i++) {
    if (!(array[i][0] in dict)) {
      dict[array[i][0]] = [];
    }
    dict[array[i][0]].push(+array[i][1]);
  }

  var ans = 0;
  Object.keys(dict).forEach((key) => {
    ans += Math.max(...dict[key]);
  });

  return ans;
}
