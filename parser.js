const { bean, beef } = require('bean-parser')
const { unflatten } = require('flat')
const fs = require("fs");
const ncsvLexer = require("./lexer.js");
const ncsvModel = fs.readFileSync("./ncsv.beef", { encoding: "utf8" });

Object.prototype.unflatten = function () {
  return unflatten(this)
}

Array.prototype.zip = function (arr) {
  return this.map((item, index) => [item, arr[index]])
}

// DEBUG

const source = fs.readFileSync("./test.csv", { encoding: "utf8" });

const tokens = ncsvLexer(source);
const model = beef(ncsvModel);

const [success, result] = bean(model, tokens);

if (success) {
  const cst = result[0];
  console.dir(cst, { depth: null });
} else {
  const firstUnmatched = result[0].name
  const expecting = model.filter(m => m.left == firstUnmatched)
  const encountered = result[1].name
  console.error(`Expecting one of ${expecting.join(', ')} but encountered ${encountered}`)
}