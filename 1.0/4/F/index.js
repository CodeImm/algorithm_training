const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var strings = fileContent
  .toString()
  .split("\n")
  .filter((str) => str !== "");

var result = getResult(strings);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(strings) {
  var dict = strings.reduce((dictionary, item) => {
    var [name, product, number] = item.split(" ");

    let nameDictionary = dictionary[name] || {};
    nameDictionary[product] = (nameDictionary[product] || 0) + +number;
    dictionary[name] = nameDictionary;
    return dictionary;
  }, {});

  return Object.keys(dict)
    .sort()
    .map((key) =>
      [
        `${key}:`,
        ...Object.keys(dict[key])
          .sort()
          .map((productKey) => `${productKey} ${dict[key][productKey]}`),
      ].join("\n")
    )
    .join("\n");
}
