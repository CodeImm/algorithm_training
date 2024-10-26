const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [N, K, M] = fileContent.toString().split(" ").map(Number);

function getResult(N, K, M) {
  if (N < K || K < M) {
    return 0;
  }

  function calcDetailsCount(weight) {
    let dcount = 0;
    let zcount = Math.floor(weight / K);
    let zremainder = weight % K;
    let dremainder = (K % M) * zcount;

    dcount += Math.floor(K / M) * zcount;

    return [dcount, zremainder + dremainder];
  }

  let count = 0;
  let weight = N;
  while (weight >= K) {
    let [dcount, reminder] = calcDetailsCount(weight);
    weight = reminder;
    count = count + dcount;
  }

  return count;
}

var result = getResult(N, K, M);

const outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
