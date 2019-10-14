const patterns = require("./patterns");

function lexer(string) {
  let tokens = [];
  let pattern, match, matched;
  let i = 0;
  let lastMatched;
  while (i < string.length) {
    matched = false;
    for (let name in patterns) {
      if (patterns.hasOwnProperty(name)) {
        pattern = patterns[name];
        match = string.slice(i).match(pattern);
        if (match != null) {
          if (
            (lastMatched == 'comma' && ['comma', 'newline'].includes(name)) ||
            (lastMatched == 'newline' && name == 'comma')) {
            tokens.push({
              name: 'empty',
              index: i,
              raw: ''
            });
          }
          tokens.push({
            name: name,
            index: i,
            raw: match[0]
          });
          i += match[0].length;
          matched = true;
          lastMatched = name
          break;
        }
      }
    }
    if (!matched) {
      throw `Lexing error at ${i}`;
    }
  }
  tokens = tokens.filter(token => !["_"].includes(token.name));
  tokens.push({
    name: "eof",
    index: string.length,
    raw: "eof"
  });
  return tokens;
}

module.exports = lexer;
