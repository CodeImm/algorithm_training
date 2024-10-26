const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var words = fileContent
  .toString()
  .split(/[\s+\n+]/)
  .filter((v) => v !== "");

var result = getResult(words);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(words) {
  var dict = {};

  for (let i = 0; i < words.length; i++) {
    if (words[i] in dict) {
      dict[words[i]] += 1;
    } else {
      dict[words[i]] = 1;
    }
  }

  var count = 0;
  var ans = "";
  for (const key in dict) {
    let nowcount = dict[key];

    if (nowcount > count || (nowcount === count && key < ans)) {
      ans = key;
      count = nowcount;
    }
  }

  return ans;
}
