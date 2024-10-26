const fs = require("fs");
const path = require("path");

const dict = {
  initial: "Initial array:",
  sorted: "Sorted array:",
  devider: "**********",
  bucket: "Bucket",
  empty: "empty",
  phase: "Phase",
};

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, array) {
  var ans = [];
  ans.push(dict.initial);
  ans.push(array.join(", "));
  ans.push(dict.devider);

  var sorted = sort(array);

  ans.push(dict.sorted);
  ans.push(sorted.join(", "));

  return ans.join("\n");

  function sort(array, place = array[0].length - 1) {
    if (place === -1) {
      return array;
    }
    ans.push(`${dict.phase} ${array[0].length - place}`);

    var count = new Array(10).fill(0);
    var log = Array.from({ length: 10 }, () => []);
    var pos = [0];

    for (let i = 0; i < array.length; i++) {
      log[array[i][place]].push(array[i]);
      count[array[i][place]] += 1;
    }

    ans.push(
      log
        .map((place, index) => {
          let record = null;
          if (place.length === 0) {
            record = dict.empty;
          } else {
            record = place.join(", ");
          }

          return `${dict.bucket} ${index}: ${record}`;
        })
        .join("\n")
    );

    for (let i = 1; i < count.length; i++) {
      pos[i] = pos[i - 1] + count[i - 1];
    }

    var sorted = [];

    array.forEach((element) => {
      sorted[pos[element[place]]] = element;
      pos[element[place]]++;
    });

    ans.push(dict.devider);
    return sort(sorted, --place);
  }
}

function parseData(strings) {
  var N = +strings[0];

  var array = strings.splice(1, N);

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
