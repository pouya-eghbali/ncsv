# NCSV

Nested CSV parser. Flattens JSON into a CSV, and restores the JSON from the CSV.

## Install

`ncsv` is hosted on npm:

```
npm i -g ncsv
```

or in case you want to use just in one project:

```
npm i -S ncsv
```

## CLI

Once installed, `ncsv` command will be available to you.

```
  USAGE: ncsv -i input -o output -m mode --pretty
    mode can be json2csv or csv2json
    mode is optional, defaults to csv2json
    --pretty outputs pretty formatted json
```

## Library

`ncsv` exports `lexer`, `model`, and `parse`. Model is a `bean` parser model.
`lexer` is used for lexing input csv, `parse` uses `bean` parser to parse the lexing results.

To parse a csv into json, just do:

```
const { parse } = require('ncsv')
const json = parse(csv)
```

`parse` expects the csv string, not a path. This function returns an object.

To read a JSON and output CSV, do:

```
const { fromJSON } = require('ncsv')
const csv = fromJSON(json)
```

`fromJSON` expects the json string, not a path, not an object. This function returns a string.

## License

Apache-2.0
