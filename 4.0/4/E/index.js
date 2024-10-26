"use strict";

var fs = require("fs");
var path = require("path");

process.stdin.on("data", (data) => {
  getResult(+data);
  process.exit();
});

function getResult(N) {
  // ( [ ) ]

  if (N % 2 !== 0 || N === 0) {
    return "";
  }

  var result = [];

  gen(N);
  process.stdout.write(result.join("\n"));

  return;

  function gen(N, seq = [], stack = []) {
    if (seq.length === N) {
      result.push(seq.join(""));
      if (result.length >= 100000) {
        process.stdout.write(result.join("\n").concat("\n"));
        result = [];
      }
      return;
    }

    if (stack.length <= N - seq.length) {
      for (let i = 0; i < 4; i++) {
        if (i === 0 && stack.length < N - seq.length) {
          seq.push("(");
          stack.push("(");
          gen(N, seq, stack);
          seq.pop();
          stack.pop();
        } else if (i === 1 && stack.length < N - seq.length) {
          seq.push("[");
          stack.push("[");
          gen(N, seq, stack);
          seq.pop();
          stack.pop();
        } else if (i === 2 && stack[stack.length - 1] === "(") {
          seq.push(")");
          stack.pop();
          gen(N, seq, stack);
          seq.pop();
          stack.push("(");
        } else if (i === 3 && stack[stack.length - 1] === "[") {
          seq.push("]");
          stack.pop();
          gen(N, seq, stack);
          seq.pop();
          stack.push("[");
        }
      }
    }
  }
}
