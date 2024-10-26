const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var [array1, array2] = parseData(strings);

var result = getResult(array1, array2);

writeToFile(result, "output.txt");

function getResult(array1, array2) {
  var ans = [];

  array2.forEach((elem) => {
    ans.push(rbinsearch(elem, array1) ? "YES" : "NO");
  });

  return ans.join("\n");

  function lbinsearch(elem, array) {
    if (elem < array[0] || elem > array[array.length - 1]) {
      return false;
    }

    var l = 0;
    var r = array.length - 1;

    var m;
    while (l < r) {
      m = Math.floor((l + r) / 2);
      if (array[m] < elem) {
        l = m + 1;
      } else {
        r = m;
      }
    }

    return array[l] === elem;
  }

  function rbinsearch(elem, array) {
    if (elem < array[0] || elem > array[array.length - 1]) {
      return false;
    }

    var l = 0;
    var r = array.length - 1;

    var m;
    while (l < r) {
      m = Math.floor((l + r + 1) / 2);
      if (array[m] > elem) {
        r = m - 1;
      } else {
        l = m;
      }
    }

    return array[l] === elem;
  }
}

function parseData(strings) {
  var [n, k] = strings[0].split(" ").map(Number);

  var array1 = strings[1].split(" ").map(Number).splice(0, n);
  var array2 = strings[2].split(" ").map(Number).splice(0, k);

  return [array1, array2];
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
