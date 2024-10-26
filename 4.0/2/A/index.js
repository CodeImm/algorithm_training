const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(string, requests) {
  var strLength = string.length;
  var p = 1000037;
  var x_ = 257;
  var x2_ = 551;

  var h = [];
  h.push(0);
  var h1 = [];
  h1.push(0);

  var x = [];
  x.push(1);
  var x1 = [];
  x1.push(1);

  string = " ".concat(string);

  for (let i = 1; i <= strLength; i++) {
    h.push((h[i - 1] * x_ + string[i].charCodeAt(0)) % p);
    x.push((x[i - 1] * x_) % p);
    h1.push((h1[i - 1] * x2_ + string[i].charCodeAt(0)) % p);
    x1.push((x1[i - 1] * x2_) % p);
  }

  var ans = [];

  requests.forEach((request) => {
    var [slen, from1, from2] = request;

    ans.push(isEqual(from1 + 1, from2 + 1, slen) ? "yes" : "no");
  });

  return ans.join("\n");

  function isEqual(from1, from2, slen) {
    return (
      (h[from1 + slen - 1] + h[from2 - 1] * x[slen]) % p ===
        (h[from2 + slen - 1] + h[from1 - 1] * x[slen]) % p &&
      (h1[from1 + slen - 1] + h1[from2 - 1] * x1[slen]) % p ===
        (h1[from2 + slen - 1] + h1[from1 - 1] * x1[slen]) % p
    );
  }
}

function parseData(strings) {
  var string = strings[0];
  var requestNumber = +strings[1];

  var requests = strings.splice(2, requestNumber).map((request) =>
    request
      .split(" ")
      .filter((str) => str !== "")
      .map(Number)
  );

  return [string, requests];
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
