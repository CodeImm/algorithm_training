const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, rooms, M, conds) {
  rooms.sort((a, b) => b - a);

  var dict = {};

  conds.forEach((cond) => {
    if (dict[cond[0]] === undefined || cond[1] < dict[cond[0]]) {
      dict[cond[0]] = cond[1];
    }
  });
  var keys = Object.keys(dict).sort((a, b) => b - a);
  var minPrice = dict[keys[0]];
  keys.forEach((key) => {
    if (dict[key] < minPrice) {
      minPrice = dict[key];
    } else {
      dict[key] = minPrice;
    }
  });

  var d = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = +keys[i]; j > +keys[i + 1]; j--) {
      d[j] = dict[keys[i]];
    }
  }
  for (let i = +keys[keys.length - 1]; i > 0; i--) {
    d[i] = dict[keys[keys.length - 1]];
  }

  var ans = 0;
  rooms.forEach((room) => {
    ans += d[room];
  });

  return ans;
}

function parseData(strings) {
  var N = +strings.splice(0, 1)[0];

  var rooms = strings[0].split(" ").map(Number);
  var M = +strings[1];
  var conds = strings.splice(2, M).map((v) => v.split(" ").map(Number));

  return [N, rooms, M, conds];
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
