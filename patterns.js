const patterns = {
  string: /^"([^"]|"")*?"/,
  comma: /^,/,
  number: /^([+-]?(\d+(\.\d+)?)|(\.\d+))(?=,|\n)/,
  true: /^true(?=,|\n)/i,
  date: /^\d{4}-\d{2}-\d{2}(?=,|\n)/,
  symbol: /^.+?(?=,|\n)/i,
  newline: /^\r?\n/,
  _: /^ +/
};

module.exports = patterns;
