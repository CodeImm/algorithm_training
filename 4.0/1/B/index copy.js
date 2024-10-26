const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, array) {
  if (N === 0) {
    return "";
  }

  var start = new Date().getTime();
  quicksort(array);
  var end = new Date().getTime();

  console.log(end - start);

  function quicksort2(array, l = 0, r = array.length - 1) {
    if (l < r) {
      const pivotIndex = partition(array, l, r);
      quicksort(array, l, pivotIndex - 1);
      quicksort(array, pivotIndex + 1, r);
    }
  }

  function quicksort(array, l = 0, r = array.length - 1) {
    var v = Math.floor((l + r) / 2);
    if (array[v] < array[l]) {
      swap(array, l, v);
    }
    if (array[r] < array[l]) {
      swap(array, l, r);
    }
    if (array[v] < array[r]) {
      swap(array, v, r);
    }
    var pivot = array[r];

    if (r <= l) {
      return;
    }
    var i = l;
    var j = r - 1;
    var p = l - 1;
    var q = r;

    while (i <= j) {
      while (array[i] < pivot) {
        i++;
      }

      while (array[j] > pivot) {
        j--;
      }

      if (i >= j) break;

      swap(array, i, j);

      if (array[i] == pivot) {
        p++;
        swap(array, p, i);
      }
      i++;

      if (array[j] == pivot) {
        q--;
        swap(array, q, j);
      }
      j--;
    }

    swap(array, i, r);
    j = i - 1;
    i++;

    for (let k = l; k <= p; k++, j--) {
      swap(array, k, j);
    }

    for (let k = r - 1; k >= q; k--, i++) {
      swap(array, k, i);
    }

    quicksort(array, l, j);
    quicksort(array, i, r);
  }

  return array.join(" ");

  function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function partition(array, l, r) {
    const pivot = array[r];
    let i = l;

    for (let j = l; j < r; j++) {
      if (array[j] < pivot) {
        if (i !== j) {
          [array[i], array[j]] = [array[j], array[i]];
        }
        i++;
      }
    }

    [array[i], array[r]] = [array[r], array[i]];
    return i;
  }
}

function parseData(strings) {
  var N = +strings[0];

  var array = strings[1].split(" ").map(Number);

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
