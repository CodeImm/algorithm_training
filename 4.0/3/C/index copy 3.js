const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, K, A, B, vertexList) {
  var vertexes = [...vertexList.keys()];

  var visited = new Array(N + 1).fill(false);
  var dist = new Array(N + 1).fill(Infinity);
  var prev = new Array(N + 1).fill(-1);

  var priorityQueue = new PriorityQueue();

  priorityQueue.enqueue(A, 0);

  dist[A] = 0;

  while (!visited[B]) {
    let min = Infinity;
    let nowVertex = null;

    vertexes.forEach((j) => {
      if (dist[j] !== Infinity && !visited[j] && dist[j] <= min) {
        min = dist[j];
        nowVertex = j;
      }
    });

    visited[nowVertex] = true;

    if (!nowVertex) {
      return "-1";
    }

    var neighboringVertices = Object.keys(vertexList.get(nowVertex));

    neighboringVertices.forEach((i) => {
      var vertexNieghborDists = vertexList.get(nowVertex);

      if (
        vertexNieghborDists?.[i] !== undefined &&
        dist[nowVertex] + vertexNieghborDists[i] <= dist[i]
      ) {
        dist[i] = dist[nowVertex] + vertexNieghborDists[i];
        prev[i] = nowVertex;
      }
    });
  }

  return dist[B] === Infinity ? -1 : dist[B];
}

function parseData(strings) {
  var [N, K] = strings[0].split(" ").map(Number);
  var vertexList = strings
    .splice(1, K)
    .map((str) => str.split(" ").map(Number));

  var map = new Map();

  vertexList.forEach(([A, B, distAB]) => {
    let startVertex = map.get(A);
    if (startVertex) {
      startVertex[B] = startVertex[B]
        ? Math.min(distAB, startVertex[B])
        : distAB;
    } else {
      map.set(A, { [B]: distAB });
    }

    let endVertexMap = map.get(B);
    if (endVertexMap) {
      endVertexMap[A] = endVertexMap[A]
        ? Math.min(distAB, endVertexMap[A])
        : distAB;
    } else {
      map.set(B, { [A]: distAB });
    }
  });

  var [A, B] = strings[1].split(" ").map(Number);
  return [N, K, A, B, map];
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

// User defined class
// to store element and its priority
class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue class
class PriorityQueue {
  // An array is used to implement priority
  constructor() {
    this.items = [];
  }

  // enqueue function to add element
  // to the queue as per priority
  enqueue(element, priority) {
    // creating object from queue element
    var qElement = new QElement(element, priority);
    var contain = false;

    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    // if the element have the highest priority
    // it is added at the end of the queue
    if (!contain) {
      this.items.push(qElement);
    }
  }

  // dequeue method to remove
  // element from the queue
  dequeue() {
    // return the dequeued element
    // and remove it.
    // if the queue is empty
    // returns Underflow
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  // front function
  front() {
    // returns the highest priority element
    // in the Priority queue without removing it.
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  // rear function
  rear() {
    // returns the lowest priority
    // element of the queue
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[this.items.length - 1];
  }

  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }

  // printQueue function
  // prints all the element of the queue
  printPQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++)
      str += this.items[i].element + " ";
    return str;
  }
}
