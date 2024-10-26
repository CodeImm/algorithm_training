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
  var ans = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i] in dict) {
      ans.push(dict[words[i]]);
      dict[words[i]] += 1;
    } else {
      ans.push(0);
      dict[words[i]] = 1;
    }
  }

  return ans.join(" ");
}
