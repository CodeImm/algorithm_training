const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var strings = fileContent.toString().split("\n");
var n = +strings[0];
var stressTest = strings[1].split(" ").map(Number);
var k = +strings[2];
var seq = strings[3].split(" ").map(Number);

var result = getResult(n, stressTest, k, seq);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(n, stressTest, k, seq) {
  var counts = [];

  for (let i = 0; i < n + 1; i++) {
    counts[i] = 0;
  }

  seq.forEach((key) => {
    counts[key] += 1;
  });

  var ans = [];

  for (let i = 1; i < n + 1; i++) {
    if (counts[i] > stressTest[i - 1]) {
      ans.push("YES");
    } else {
      ans.push("NO");
    }
  }

  return ans.join("\n");
}
