const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, coords) {
  var ans = 0;
  for (let left = 0; left < N; left++) {
    let dists = [];
    let dictx = new Map();
    for (let right = 0; right < N; right++) {
      if (left !== right) {
        let dx = coords[right][0] - coords[left][0];
        let dy = coords[right][1] - coords[left][1];
        let d = dx * dx + dy * dy;

        if (!dictx.has(dx)) {
          dictx.set(dx, new Set([dy]));
        } else {
          dictx.get(dx).add(dy);
        }

        if (dictx.get(-dx) && dictx.get(-dx).has(-dy)) {
          ans -= 1;
        }

        dists.push(d);
      }
    }
    dists.sort((a, b) => a - b);

    var l = 0;
    var r = 1;
    while (l < N - 1) {
      let count = 1;

      while (r < N && dists[l] === dists[r]) {
        count += 1;
        r++;
      }

      ans += ((count - 1) * count) / 2;
      l = r;
      r++;
    }
  }

  return ans >= 0 ? ans : 0;
}

function parseData(strings) {
  var N = +strings.splice(0, 1)[0];

  var coords = strings.splice(0, N).map((v) => v.split(" ").map(Number));

  return [N, coords];
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
