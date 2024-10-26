"use strict";

var fs = require("fs");
var path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N) {
  var usedUpDiagonals = new Set();
  var usedDownDiagonals = new Set();
  var usedRows = new Set();
  var usedColumns = new Set();

  var count = 0;

  gen(N, usedUpDiagonals, usedDownDiagonals, usedRows, usedColumns);

  return count;

  function gen(
    N,
    usedUpDiagonals,
    usedDownDiagonals,
    usedRows,
    usedColumns,
    settled = 0
  ) {
    if (settled === N) {
      count++;
      return;
    }

    var currentRow = settled;

    for (let column = 0; column < N; column++) {
      if (
        !usedColumns.has(column) &&
        !usedRows.has(currentRow) &&
        !usedUpDiagonals.has(currentRow + column) &&
        !usedDownDiagonals.has(currentRow - column)
      ) {
        usedRows.add(currentRow);
        usedColumns.add(column);
        usedUpDiagonals.add(currentRow + column);
        usedDownDiagonals.add(currentRow - column);

        settled++;

        gen(
          N,
          usedUpDiagonals,
          usedDownDiagonals,
          usedRows,
          usedColumns,
          settled
        );

        usedRows.delete(currentRow);
        usedColumns.delete(column);
        usedUpDiagonals.delete(currentRow + column);
        usedDownDiagonals.delete(currentRow - column);

        settled--;
      }
    }
  }
}

function parseData(strings) {
  var N = +strings[0];

  return [N];
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
