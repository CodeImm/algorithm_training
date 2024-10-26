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

  const bracketCounts = {
    "(": 0,
    ")": 0,
    "[": 0,
    "]": 0,
  };

  gen(N, [], [], bracketCounts);

  return result.join("\n");

  function gen(N, stack = [], helpStack = [], bracketCounts) {
    if (stack.length === N) {
      if (helpStack.length === 0) {
        result.push(stack.join(""));
      }
      stack = null;
      helpStack = null;
      return;
    }

    for (let i = 0; i < 4; i++) {
      if (
        i === 0 &&
        bracketCounts["("] < N / 2 &&
        helpStack.length < N - stack.length
      ) {
        bracketCounts["("]++;
        stack.push("(");
        helpStack.push("(");
        gen(N, stack, helpStack, bracketCounts);
        bracketCounts["("]--;
        stack.pop();
        helpStack.pop();
      } else if (
        i === 1 &&
        bracketCounts["["] < N / 2 &&
        helpStack.length < N - stack.length
      ) {
        stack.push("[");
        helpStack.push("[");
        bracketCounts["["]++;
        gen(N, stack, helpStack, bracketCounts);
        bracketCounts["["]--;
        stack.pop();
        helpStack.pop();
      } else if (
        i === 2 &&
        bracketCounts[")"] < N / 2 &&
        helpStack[helpStack.length - 1] === "("
      ) {
        stack.push(")");
        bracketCounts[")"]++;
        helpStack.pop();
        gen(N, stack, helpStack, bracketCounts);
        bracketCounts[")"]--;
        stack.pop();
        helpStack.push("(");
      } else if (
        i === 3 &&
        bracketCounts["]"] < N / 2 &&
        helpStack[helpStack.length - 1] === "["
      ) {
        stack.push("]");
        bracketCounts["]"]++;
        helpStack.pop();
        gen(N, stack, helpStack, bracketCounts);
        bracketCounts["]"]--;
        stack.pop();
        helpStack.push("[");
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
