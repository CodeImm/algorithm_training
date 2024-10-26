const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [genome1, genome2] = fileContent.toString().split("\n");

var result = getResult(genome1, genome2);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(genome1, genome2) {
  var base = getBase(genome2);

  var ans = 0;
  for (let i = 0; i < genome1.length - 1; i++) {
    if (base.has(`${genome1[i]}${genome1[i + 1]}`)) {
      ans++;
    }
  }

  return ans;

  function getBase(genome) {
    var base = [];

    for (let i = 0; i < genome.length - 1; i++) {
      base.push(`${genome[i]}${genome[i + 1]}`);
    }

    return new Set(base);
  }
}
