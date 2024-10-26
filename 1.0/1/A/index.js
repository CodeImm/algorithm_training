const fs = require("fs");
const path = require("path");

const fileContent = readFile("input.txt");
const result = getResult(...parseData(fileContent));
writeToFile(result, "output.txt");

function getResult(roomt, condt, mode) {
  switch (mode) {
    case "freeze":
      return condt >= roomt ? roomt : condt;
    case "heat":
      return condt >= roomt ? condt : roomt;
    case "auto":
      return condt;
    case "fan":
      return roomt;
    default:
      throw new Error(`Invalid mode: ${mode}`);
  }
}

function parseData(strings) {
  const [roomt, condt] = strings[0].split(" ").map(Number);
  const mode = strings[1].trim();

  return [roomt, condt, mode];
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
