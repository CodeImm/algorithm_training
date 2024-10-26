const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");
/* 
сущ k такое, что k*a<=n и k*b>=n?, если да, то -YES
 */
function getResult(N, array) {
  var ans = [];

  array.forEach((test) => {
    var [n, a, b] = test;

    ans.push(getAnswer(n, a, b));
  });

  return ans.join("\n");

  function getAnswer(n, a, b) {
    for (let i = a; i <= b; i++) {
      if (n % i === 0) {
        return "YES";
      }
      // можно перебирать только пары соседних элементов
      for (let j = i + 1; j <= b; j++) {
        var m = Math.floor(n / i);
        var ost = n % i;
        var diff = j - i;

        if (ost % diff === 0) {
          let aPlusiCount = ost / diff;
          if (aPlusiCount < m) {
            return "YES";
          }
        }
      }
    }

    return "NO";
  }
}

function parseData(strings) {
  var N = +strings[0];
  var array = strings.splice(1, N).map((str) =>
    str
      .split(" ")
      .filter((v) => v !== "")
      .map(Number)
  );

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
