const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, array, x) {
  var ans = [];

  // console.log(N, array, x);
  // console.log(array);
  var index = findOrderStatistic(array, 8);
  console.log(index);

  return ans.join("\n");

  function findOrderStatistic(array, x) {
    var left = 0,
      right = array.length - 1;

    while (true) {
      let mid = partition(array, left, right);
      // console.log({ array, mid });
      if (mid == x) {
        return mid;
      } else if (x < mid) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
  }

  function partition(array, l, r) {
    var v = array[Math.floor((l + r) / 2)];
    var i = l;
    var j = r;
    while (i <= j) {
      while (array[i] < v) {
        i++;
      }

      while (array[j] > v) {
        j--;
      }

      if (i >= j) break;

      swap(array, i, j);
    }

    return j;
  }

  function swap(array, a, b) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    // console.log(a, b);
    // console.log(array);
  }
}

function parseData(strings) {
  var N = +strings.splice(0, 1)[0];

  var array = strings
    .splice(0, 1)[0]
    .split(" ")
    .filter((str) => str !== "")
    .map(Number);

  var x = +strings.splice(0, 1)[0];

  return [N, array, x];
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
