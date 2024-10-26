const fs = require("fs");
const path = require("path");

const strings = readFile("input.txt");

const [n, a, b, w, h] = parseData(strings);

const result = getResult(n, a, b, w, h);

writeToFile(result, "output.txt");

function getResult(n, a, b, w, h) {
  n = BigInt(n);
  a = BigInt(a);
  b = BigInt(b);
  w = BigInt(w);
  h = BigInt(h);

  const ans1 = search(n, a, b, w, h);
  const ans2 = search(n, b, a, w, h);

  return max(ans1, ans2);

  function search(n, a, b, w, h) {
    let l = 0n;
    let r = max(w, h);

    let m;
    while (l < r) {
      m = (l + r + 1n) / 2n;
      if (check(n, a, b, w, h, m)) {
        l = m;
      } else {
        r = m - 1n;
      }
      console.log(m);
    }

    return l;
  }

  function check(n, a, b, w, h, d) {
    return (w / (a + 2n * d)) * (h / (b + 2n * d)) >= n;
  }

  function max(x, y) {
    return x > y ? x : y;
  }

  function min(x, y) {
    return x < y ? x : y;
  }
}

function parseData(strings) {
  const [n, a, b, w, h] = strings[0].split(" ").map(Number);

  return [n, a, b, w, h];
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
