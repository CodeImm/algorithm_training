const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var [keyWords, words, C, D] = parseData(strings);

var result = getResult(keyWords, words, C, D);

writeToFile(result, "output.txt");

function getResult(keyWords, words, C, D) {
  var dict = {};
  var order = {};

  words.forEach((word, index) => {
    if (C === "no") {
      word = word.toLowerCase();
    }

    let canId =
      D === "yes"
        ? /\w+/.test(word) && !/^[0-9]+$/.test(word)
        : /^(?!\d)\w+/.test(word);

    if (canId && !keyWords.has(word)) {
      if (!(word in dict)) {
        order[word] = index;
        dict[word] = 0;
      }

      dict[word] += 1;
    }
  });

  var max = Math.max(...Object.values(dict));

  var keys = Object.keys(dict).filter((key) => dict[key] === max);

  var minOrder = order[keys[0]];
  var ans = keys[0];
  keys.forEach((key) => {
    if (order[key] < minOrder) {
      ans = key;
      minOrder = order[key];
    }
  });

  return ans;
}

function parseData(strings) {
  strings = strings.filter((str) => str !== "");

  var [n, C, D] = strings.splice(0, 1)[0].split(" ");

  var keyWords = new Set(
    strings.splice(0, +n).map((word) => {
      if (C === "no") {
        return word.toLowerCase();
      } else {
        return word;
      }
    })
  );

  words = strings
    .flatMap((str) => str.split(/[^a-zA-Z0-9_]/))
    .filter((word) => word !== "");

  return [keyWords, words, C, D];
}

function readFile(fileName) {
  var inputPath = path.resolve(__dirname, fileName);
  var fileContent = fs.readFileSync(inputPath, "utf8");

  return fileContent.toString().split("\n");
}

function writeToFile(data, fileName) {
  var outputPath = path.resolve(__dirname, fileName);
  fs.writeFileSync(outputPath, data.toString());
}
