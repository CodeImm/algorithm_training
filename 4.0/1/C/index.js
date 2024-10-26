const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, M, array1, array2) {
  var ans = [];

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
      ans.push(array1[i]);
      i++;
    } else {
      ans.push(array2[j]);
      j++;
    }
  }

  ans.push(...array1.slice(i));
  ans.push(...array2.slice(j));

  return ans.join(" ");
}

function parseData(strings) {
  var N = +strings[0];

  var array1 = strings[1]
    .split(" ")
    .filter((str) => str !== "")
    .map(Number);

  var M = +strings[2];

  var array2 = strings[3]
    .split(" ")
    .filter((str) => str !== "")
    .map(Number);

  return [N, M, array1, array2];
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
