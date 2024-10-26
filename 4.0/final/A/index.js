"use strict";

var fs = require("fs");
var path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N) {
  var used = new Array(N + 1).fill(false);

  var result = [];

  gen(N, used);

  return result.join("\n");

  function gen(n, used, prefix = []) {
    if (prefix.length === n) {
      result.push(prefix.join(""));
      return;
    }

    for (let i = 1; i <= n; i++) {
      if (!used[i]) {
        used[i] = true;
        prefix.push(i);
        console.log({ i, used, prefix });
        gen(n, used, prefix);
        used[i] = false;
        prefix.pop();
      }
    }
  }
}

function parseData(strings) {
  var N = +strings[0];

  return [N];
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
