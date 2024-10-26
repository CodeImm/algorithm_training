const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [N, ...array] = fileContent.toString().split("\n");

var result = getResult(N, array);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(N, array) {
  var set = new Set();
  var common = new Set();

  var count = 0;

  for (let i = 0, index = 0; i < N; i++, index += count + 1) {
    count = +array[index];
    let languages = new Set(array.slice(index + 1, index + count + 1));

    common.forEach((language) => {
      if (!languages.has(language)) {
        common.delete(language);
      }
    });

    languages.forEach((language) => {
      set.add(language);

      if (i === 0) {
        common.add(language);
      }
    });
  }

  return [common.size, ...common, set.size, ...set].join("\n");
}
