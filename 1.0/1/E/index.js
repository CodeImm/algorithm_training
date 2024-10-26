const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [k1, m, k2, p2, n2] = fileContent.toString().split(" ").map(Number);

function getResult(k1, m, k2, p2, n2) {
  // кол-во квартир на площадке
  let smin = Math.ceil(k2 / (p2 * m - m + n2));
  let smax =
    p2 * m - m + n2 - 1 === 0
      ? 1000000
      : Math.floor((k2 - 1) / (p2 * m - m + n2 - 1));

  console.log(smin, smax);
  if (
    (k2 < (p2 - 1) * smin * m + n2 * smin - smin + 1 ||
      k2 > (p2 - 1) * smin * m + n2 * smin) &&
    (k2 < (p2 - 1) * smax * m + n2 * smax - smax + 1 ||
      k2 > (p2 - 1) * smax * m + n2 * smax)
  ) {
    return "-1 -1";
  }

  let p11 = Math.ceil(k1 / (m * smin));
  let p12 = Math.ceil(k1 / (m * smax)); ///

  let n11 = Math.ceil(k1 / smin) - (p11 - 1) * m;
  let n12 = Math.ceil(k1 / smax) - (p12 - 1) * m; //

  // 11 1 1 1 1
  console.log(p11, p12, n11, n12);

  let p1 = p11 !== p12 ? 0 : p11; //0
  let n1 = n11 !== n12 ? 0 : n11; //1
  return [p1, n1].join(" ");
}

var result = getResult(k1, m, k2, p2, n2);

const outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
