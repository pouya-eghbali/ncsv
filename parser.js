const { bean, beef } = require('bean-parser')
const fs = require("fs");
const ncsvLexer = require("./lexer.js");
const { resolve } = require('path')
const ncsvModel = fs.readFileSync(resolve(__dirname, "ncsv.beef"), { encoding: "utf8" });

const { unflatten } = require('flat')
const zip = (left, right) => left.map((item, index) => [item, right[index]])

const helpers = { unflatten, zip }
const model = beef(ncsvModel, helpers);

const parse = source => {
  const tokens = ncsvLexer(source);
  const [success, result] = bean(model, tokens);
  if (success) {
    const cst = result[0];
    return cst.rows
  } else {
    const firstUnmatched = result[0].name
    const expecting = model.filter(m => m.left == firstUnmatched).map(({ right }) => right)
    const encountered = result[1].name
    const ParsingError = `Expecting one of ${expecting.join(', ')} but encountered ${encountered}`
    throw ParsingError
  }
}

module.exports.parse = parse
module.exports.model = model
module.exports.lexer = ncsvLexer