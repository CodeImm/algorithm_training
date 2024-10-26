const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var [array1, array2] = parseData(strings);

var result = getResult(array1, array2);

writeToFile(result, "output.txt");

function getResult(array1, array2) {
  var ans = [];

  array2.forEach((elem) => {
    let minIndex = search(elem, array1);

    let closer =
      minIndex < array1.length - 1 &&
      array1[minIndex + 1] - elem < elem - array1[minIndex]
        ? array1[minIndex + 1]
        : array1[minIndex];
    ans.push(closer);
  });

  return ans.join("\n");

  function search(elem, array) {
    var m;
    var l = 0;
    var r = array.length - 1;

    while (l < r) {
      m = Math.floor((l + r + 1) / 2);

      if (elem > array[m]) {
        l = m;
      } else {
        r = m - 1;
      }
    }

    return l;
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
