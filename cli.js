const argv = require('minimist')(process.argv)
const { parse } = require('./parser')
const flat = require('flat')
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

  const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  const dateParser = (key, value) => {
    if (typeof value === 'string') {
      const match = reISO.exec(value)
      if (match) return new Date(value)
    }
    return value
  };

  const toCSVValue = value => {
    if (value instanceof Date) {
      return value.toISOString().slice(0, 10)
    }
    if (value == undefined) {
      return ''
    }
    if (typeof value == 'string') {
      return '"' + value.replace(/"/g, '""') + '"'
    }
    return value.toString()
  }


  const inputJSON = JSON.parse(input, dateParser)
  const flatInput = inputJSON.map(flat)
  const headers = new Set()
  flatInput.forEach(item => {
    Object.keys(item).forEach(key => {
      headers.add(key)
    })
  });
  const sortedHeaders = [...headers].sort()
  const rows = [sortedHeaders]
  flatInput.forEach(item => {
    const row = []
    sortedHeaders.forEach(key => {
      row.push(item[key])
    })
    rows.push(row.map(toCSVValue))
  })
  const CSVRows = rows.map(row => row.join(','))
  const CSV = CSVRows.join('\n') + '\n'
  fs.writeFileSync(argv.o, CSV)
}
else {
  const result = parse(input)
  const indent = argv.pretty ? 2 : 0
  fs.writeFileSync(argv.o, JSON.stringify(result, null, indent))
}