const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, K, array) {
  let ans = [1, N];
  let minLength = N;

  let left = 0,
    right = K - 1;

  let dict = new Map();

  for (let i = 0; i < K - 1; i++) {
    dict.set(array[i], (dict.get(array[i]) || 0) + 1);
  }

  while (left < N - K + 1) {
    while (dict.size != K && right <= N) {
      dict.set(array[right], (dict.get(array[right]) || 0) + 1);

      right++;
    }

    if (right > N) {
      return ans.join(" ");
    }

    while (dict.size === K) {
      dict.set(array[left], dict.get(array[left]) - 1);
      if (dict.get(array[left]) === 0) {
        dict.delete(array[left]);
      }

      left++;
    }
    left--;

    if (right - left === K) {
      return [left + 1, right].join(" ");
    }

    if (right - left < minLength) {
      minLength = right - left;
      ans = [left + 1, right];
    }

    left++;
  }

  return ans.join(" ");
}

function parseData(strings) {
  var [N, K] = strings[0].split(" ").map(Number);

  var array = strings[1].split(" ").map(Number);

  return [N, K, array];
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
