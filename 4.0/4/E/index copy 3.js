"use strict";

var fs = require("fs");
var path = require("path");

var strings = readFile("brackets2.in");

var result = getResult(...parseData(strings));

writeToFile(result, "brackets2.out");

function getResult(N) {
  // ( [ ) ]

  if (N % 2 !== 0 || N === 0) {
    return "";
  }

  var result = [];

  gen(N);

  return result.join("\n");

  function gen(N, seq = [], stack = []) {
    if (seq.length === N) {
      result.push(seq.join(""));

      return;
    }

    if (stack.length <= N / 2) {
      for (let i = 0; i < 4; i++) {
        if (i === 0 && stack.length < N - seq.length) {
          seq.push("(");
          stack.push("(");
          gen(N, seq, stack);
          seq.pop();
          stack.pop();
        } else if (i === 1 && stack.length < N - seq.length) {
          seq.push("[");
          stack.push("[");
          gen(N, seq, stack);
          seq.pop();
          stack.pop();
        } else if (i === 2 && stack[stack.length - 1] === "(") {
          seq.push(")");
          stack.pop();
          gen(N, seq, stack);
          seq.pop();
          stack.push("(");
        } else if (i === 3 && stack[stack.length - 1] === "[") {
          seq.push("]");
          stack.pop();
          gen(N, seq, stack);
          seq.pop();
          stack.push("[");
        }
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
