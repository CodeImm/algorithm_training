"use strict";

var fs = require("fs");
var path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, M, array) {
  var arr = [];

  for (let i = 0; i < M; i++) {
    arr.push(array[i]);
    arr.push(array[i]);
  }

  var ans = null;
  var flagMore = false;
  var flagLess = false;

  for (let k = 1; k <= arr.length; k++) {
    const combination = Array(k);
    const internalCombine = (start, depth, sum = 0) => {
      if (depth === k) {
        if (sum === N) {
          ans = [combination.length, combination.join(" ")].join("\n");
        } else if (sum > N) {
          flagMore = true;
        } else if (sum < N) {
          flagLess = true;
        }
        return;
      }
      if (!ans) {
        for (let index = start; index < arr.length; index++) {
          combination[depth] = arr[index];
          sum += arr[index];
          internalCombine(index + 1, depth + 1, sum);
          sum -= arr[index];
        }
      }
    };

    internalCombine(0, 0);
  }

  if (ans) {
    return ans;
  }

  if (!flagMore) {
    return "-1";
  }

  return "0";
}

function parseData(strings) {
  var [N, M] = strings[0].split(" ").map(Number);

  var array = strings[1]
    .split(" ")
    .filter((str) => str !== "")
    .map(Number)
    .sort((a, b) => b - a);

  return [N, M, array];
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
