const CsvReadableStream = require('csv-reader');

const fs = require('fs');

let inputStream = fs.createReadStream('french_data.csv', 'utf8');

inputStream
  .pipe(CsvReadableStream({ trim: true }))
  .on('data', function (row) {
    console.log('A row arrived: ', row);
  })
  .on('end', function () {
    console.log('No more rows!');
  });
