const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var strings = fileContent.toString().split("\n");
var [g, s] = strings[0].split(" ").map(Number);
var W = strings[1];
var S = strings[2];
console.log(W, S);
var result = getResult(W, S);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(W, S) {
  if (W.length > S.length) {
    return 0;
  }

  const startCode = "azAZ".charCodeAt(0);
  const endCode = "azAZ".charCodeAt(1);
  const startCode2 = "azAZ".charCodeAt(2);
  const endCode2 = "azAZ".charCodeAt(3);

  var w = [];
  var s = [];
  var azLength = endCode - startCode + 1;
  var AZLength = endCode2 - startCode2 + 1;
  var alphabetLength = azLength + AZLength;

  for (let i = 0; i < alphabetLength; i++) {
    w[i] = 0;
    s[i] = 0;
  }

  var ans = 0;

  fillAlphabet(w, W);
  fillAlphabet(s, S.slice(0, W.length));
  ans += compareArrays(w, s);

  for (let i = 0; i < S.length - W.length; i++) {
    addSymbol(S[W.length + i].charCodeAt(0), s);
    deleteSymbol(S[i].charCodeAt(0), s);

    ans += compareArrays(w, s);
  }

  return ans;

  function fillAlphabet(w, W) {
    for (let i = 0; i < W.length; i++) {
      let charCode = W[i].charCodeAt(0);
      addSymbol(charCode, w);
    }

    return w;
  }

  function addSymbol(charCode, w) {
    if (charCode >= startCode && charCode <= endCode) {
      w[charCode - startCode] += 1;
    }
    if (charCode >= startCode2 && charCode <= endCode2) {
      w[charCode - startCode2 + azLength] += 1;
    }
  }

  function deleteSymbol(charCode, w) {
    if (charCode >= startCode && charCode <= endCode) {
      w[charCode - startCode] -= 1;
    }
    if (charCode >= startCode2 && charCode <= endCode2) {
      w[charCode - startCode2 + azLength] -= 1;
    }
  }

  function compareArrays(array1, array2) {
    if (array1.length !== array2.length) {
      return 0;
    }

    for (let index = 0; index < array1.length; index++) {
      if (array2[index] !== array1[index]) {
        return 0;
      }
    }

    return 1;
  }
}
