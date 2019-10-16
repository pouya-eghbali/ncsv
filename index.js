const { parse, lexer, model } = require('./parser')
const { fromJSON } = require('./json')

module.exports = { parse, lexer, model, fromJSON }