const { parse, lexer, model } = require('./parser')
const { fromJSON } = require('./jsonlib')

module.exports = { parse, lexer, model, fromJSON }