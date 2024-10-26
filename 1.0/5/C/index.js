const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, peaks, M, tracks) {
  var prefixsumToRight = [0];
  var prefixsumToLeft = [0];

  for (let i = 1; i < peaks.length; i++) {
    let diff = peaks[i][1] - peaks[i - 1][1];

    if (diff > 0) {
      prefixsumToRight.push(
        prefixsumToRight[prefixsumToRight.length - 1] + diff
      );
    } else {
      prefixsumToRight.push(prefixsumToRight[prefixsumToRight.length - 1]);
    }
  }

  for (let i = peaks.length - 2; i >= 0; i--) {
    let diff = peaks[i][1] - peaks[i + 1][1];

    if (diff > 0) {
      prefixsumToLeft.push(prefixsumToLeft[prefixsumToLeft.length - 1] + diff);
    } else {
      prefixsumToLeft.push(prefixsumToLeft[prefixsumToLeft.length - 1]);
    }
  }
  prefixsumToLeft.reverse();

  var ans = [];
  tracks.forEach((track) => {
    if (track[1] >= track[0]) {
      ans.push(prefixsumToRight[track[1] - 1] - prefixsumToRight[track[0] - 1]);
    } else {
      ans.push(prefixsumToLeft[track[1] - 1] - prefixsumToLeft[track[0] - 1]);
    }
  });

  return ans.join("\n");
}

function parseData(strings) {
  var N = +strings.splice(0, 1)[0];

  var peaks = strings.splice(0, N).map((v) => v.split(" ").map(Number));
  var M = +strings.splice(0, 1)[0];
  var tracks = strings.splice(0, M).map((v) => v.split(" ").map(Number));

  return [N, peaks, M, tracks];
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
