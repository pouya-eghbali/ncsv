#!/usr/bin/env node

const argv = require('minimist')(process.argv)
const { parse } = require('./parser')
const fs = require('fs')

const usage = `
  USAGE: ncsv -i input -o output -m mode --pretty
    mode can be json2csv or csv2json
    mode is optional, defaults to csv2json
    --pretty outputs pretty formatted json
`

if (!argv.i || !argv.o) {
  console.log(usage);
  process.exit(1)
}

if (argv.m && !['json2csv', 'csv2json'].includes(argv.m)) {
  console.log(usage);
  process.exit(1)
}

const input = fs.readFileSync(argv.i, { encoding: 'utf8' })

if (argv.m && argv.m == 'json2csv') {
  const CSV = fromJSON(input)
  fs.writeFileSync(argv.o, CSV)
}
else {
  const result = parse(input)
  const indent = argv.pretty ? 2 : 0
  fs.writeFileSync(argv.o, JSON.stringify(result, null, indent))
}