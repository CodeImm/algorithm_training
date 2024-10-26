const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, array) {
  if (N === 0) {
    return "";
  }

  var sortedArray = sort(array);

  return sortedArray.join(" ");

  function sort(array) {
    if (array.length === 1) {
      return array;
    }
    var mid = Math.floor(array.length / 2);

    return merge(sort(array.slice(0, mid)), sort(array.slice(mid)));
  }

  function merge(array1, array2) {
    var merged = [];

    var N = array1.length;
    var M = array2.length;

    if (N === 0 && M === 0) {
      return "";
    } else if (N === 0) {
      return array2.join(" ");
    } else if (M === 0) {
      return array1.join(" ");
    }

    var i = 0,
      j = 0;
    while (i < N && j < M) {
      if (array1[i] < array2[j]) {
        merged.push(array1[i]);
        i++;
      } else {
        merged.push(array2[j]);
        j++;
      }
    }

    merged.push(...array1.slice(i));
    merged.push(...array2.slice(j));

    return merged;
  }
}

function parseData(strings) {
  var N = +strings[0];

  var array = strings[1]
    .split(" ")
    .filter((str) => str !== "")
    .map(Number);

  return [N, array];
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
