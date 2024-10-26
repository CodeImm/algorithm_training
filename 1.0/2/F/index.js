const fs = require("fs");
const path = require("path");

const fileContent = readFile("input.txt");
const result = getResult(parseData(fileContent));
writeToFile(result, "output.txt");

function getResult(array) {
  var endIndexToCopy = -1;
  var length = array.length;

  for (let i = 0, j = length - 1; i < Math.floor(length / 2); ) {
    if (array[i] !== array[j]) {
      endIndexToCopy = endIndexToCopy + 1;
      length = array.length + endIndexToCopy + 1;
      i = endIndexToCopy + 1;
      j = array.length - 1;
    } else {
      i++;
      j--;
    }
  }

  return endIndexToCopy === -1
    ? 0
    : [
        endIndexToCopy + 1,
        array
          .slice(0, endIndexToCopy + 1)
          .reverse()
          .join(" "),
      ].join("\n");
}

function parseData(strings) {
  const [N, array] = strings;

  return array
    .split(" ")
    .filter((v) => v !== "")
    .map(Number);
}

function readFile(fileName) {
  const inputPath = path.resolve(__dirname, fileName);
  const fileContent = fs.readFileSync(inputPath, "utf8");

  return fileContent.toString().split("\n");
}

function writeToFile(data, fileName) {
  const outputPath = path.resolve(__dirname, fileName);
  fs.writeFileSync(outputPath, data.toString());
}
