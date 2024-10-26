const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [pnum1, ...pnums] = fileContent
  .toString()
  .split("\n")
  .filter(Boolean)
  .map((pnum) => normalizePhoneNumber(pnum));

function normalizePhoneNumber(phoneNumber) {
  const DEFAULT_CODE = 495;

  phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

  if (phoneNumber.length === 7) {
    phoneNumber = `${DEFAULT_CODE}${phoneNumber}`;
  } else {
    phoneNumber = phoneNumber.substring(1);
  }

  return phoneNumber;
}

function comparePhoneNumbers(pnum1, pnum2) {
  return pnum1 === pnum2 ? "YES" : "NO";
}

function getResult(pnum1, pnums) {
  return pnums.map((phum) => comparePhoneNumbers(phum, pnum1)).join("\n");
}

var result = getResult(pnum1, pnums);

const outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
