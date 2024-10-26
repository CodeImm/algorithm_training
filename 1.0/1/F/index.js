const fs = require("fs");
const path = require("path");

const fileContent = readFile("input.txt");
const result = getResult(...parseData(fileContent));
writeToFile(result, "output.txt");

function getResult(a, b, c, d) {
  const s1 = Math.max(a, c) * (b + d);
  const s2 = Math.max(a, d) * (b + c);
  const s3 = Math.max(b, d) * (a + c);
  const s4 = Math.max(b, c) * (a + d);

  let mins = s1;
  let ans = `${Math.max(a, c)} ${b + d}`;

  if (s2 < mins) {
    mins = s2;
    ans = `${Math.max(a, d)} ${b + c}`;
  }

  if (s3 < mins) {
    mins = s3;
    ans = `${Math.max(b, d)} ${a + c}`;
  }

  if (s4 < mins) {
    mins = s4;
    ans = `${Math.max(b, c)} ${a + d}`;
  }

  return ans;
}

function parseData(strings) {
  const [a, b, c, d] = strings[0].split(" ").map(Number);

  return [a, b, c, d];
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

// function getResult(arr) {
//   function calcSquare(i1, i2) {
//     let sum = 0;
//     for (let j = 0; j < arr.length; j++) {
//       if (j !== i1 && j !== i2) {
//         sum += arr[j];
//       }
//     }

//     return [Math.max(arr[i1], arr[i2]), sum];
//   }

//   let newArr = [
//     calcSquare(0, 2),
//     calcSquare(0, 3),
//     calcSquare(1, 2),
//     calcSquare(1, 3),
//   ];

//   let ans = 0;
//   for (let i = 1; i < newArr.length; i++) {
//     if (newArr[i][0] * newArr[i][1] < newArr[ans][0] * newArr[ans][1]) {
//       ans = i;
//     }
//   }

//   return newArr[ans].join(" ");
// }
