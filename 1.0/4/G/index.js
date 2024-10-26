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
  var clients = {};

  var ans = [];

  strings.forEach((string) => {
    let [operation, ...params] = string.split(" ");

    switch (operation) {
      case "DEPOSIT": {
        let [client, sum] = params;
        deposit(client, sum);
        break;
      }
      case "WITHDRAW": {
        let [client, sum] = params;
        withdraw(client, sum);
        break;
      }
      case "TRANSFER": {
        let [client1, client2, sum] = params;
        transfer(client1, client2, sum);
        break;
      }
      case "INCOME": {
        let [percent] = params;
        incomeAll(percent);
        break;
      }
      case "BALANCE": {
        balance(params[0]);
        break;
      }
    }
  });

  return ans.join("\n");

  function transfer(client1, client2, sum) {
    deposit(client2, sum);
    withdraw(client1, sum);
  }

  function deposit(client, sum) {
    if (!(client in clients)) {
      clients[client] = 0;
    }

    clients[client] += +sum;
  }

  function withdraw(client, sum) {
    if (!(client in clients)) {
      clients[client] = 0;
    }

    clients[client] -= +sum;
  }

  function incomeAll(percent) {
    for (const client in clients) {
      let balance = +clients[client];
      if (balance > 0) {
        clients[client] += Math.trunc(balance * (+percent / 100));
      }
    }
  }

  function balance(client) {
    if (!(client in clients)) {
      ans.push("ERROR");
    } else {
      ans.push(clients[client]);
    }
  }
}
