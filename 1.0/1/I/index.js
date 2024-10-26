// const fs = require("fs");
// const path = require("path");

// var inputPath = path.resolve(__dirname, "input.txt");
// var fileContent = fs.readFileSync(inputPath, "utf8");

// var [a, b, c, d, e] = fileContent.toString().split("\n").map(Number);

// function getResult(a, b, c, d, e) {
//   if (
//     Math.min(a, b, c) <= Math.min(d, e) &&
//     (Math.max(a, b) <= Math.max(d, e) ||
//       Math.max(b, c) <= Math.max(d, e) ||
//       Math.max(a, c) <= Math.max(d, e))
//   ) {
//     return "YES";
//   }

//   return "NO";
// }

// var result = getResult(a, b, c, d, e);

// var outputPath = path.resolve(__dirname, "output.txt");
// fs.writeFileSync(outputPath, result.toString());

// Решение2: Отсортировать пузырьком и сравнить 2 наименьших там и там

var fs = require("fs");
var path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [a, b, c, d, e] = fileContent.toString().split("\n").map(Number);

var result = getResult(a, b, c, d, e);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(a, b, c, d, e) {
  var [a, b] = sort(a, b);
  var [b, c] = sort(b, c);
  var [a, b] = sort(a, b);

  var [d, e] = sort(d, e);

  if (a <= d && b <= e) {
    return "YES";
  }

  return "NO";
}

function sort(a, b) {
  if (a > b) {
    return [b, a];
  }

  return [a, b];
}
