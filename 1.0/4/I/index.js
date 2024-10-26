const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [N, ...words] = fileContent
  .toString()
  .split("\n")
  .filter((str) => str !== "");
var text = words[N];
words = words.slice(0, N);

var result = getResult(N, words, text);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(N, words, text) {
  if (text === undefined) {
    return 0;
  }
  text = text.split(" ");

  var startCode = "A".charCodeAt(0);
  var endCode = "Z".charCodeAt(0);

  var dict = {};

  words.forEach((word) => {
    for (let i = 0; i < word.length; i++) {
      let charCode = word.charCodeAt(i);
      if (charCode >= startCode && charCode <= endCode) {
        let lowerCaseWord = word.toLowerCase();

        if (!(lowerCaseWord in dict)) {
          dict[lowerCaseWord] = new Set();
        }

        dict[lowerCaseWord].add(i);
      }
    }
  });

  var ans = 0;
  text.forEach((word) => {
    let lowerCaseWord = word.toLowerCase();

    let capitalCount = 0;
    let capitalIndex = -1;
    for (let i = 0; i < word.length; i++) {
      let charCode = word.charCodeAt(i);
      if (charCode >= startCode && charCode <= endCode) {
        capitalCount += 1;
        capitalIndex = i;
      }
    }
    if (capitalCount !== 1) {
      ans += 1;
    } else if (
      lowerCaseWord in dict &&
      !dict[lowerCaseWord].has(capitalIndex)
    ) {
      ans += 1;
    }
  });

  return ans;
}
