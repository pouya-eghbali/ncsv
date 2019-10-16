const flat = require('flat')

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

const fromJSON = input => {
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
  return CSV
}

module.exports.fromJSON = fromJSON