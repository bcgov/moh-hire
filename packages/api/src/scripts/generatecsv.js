const fs = require('fs');
const uuidV4 = require('uuid').v4;
const faker = require('faker');

function generateFakeEmailArray() {
  const array = [];
  for (let i = 0; i < 10000; i++) {
    array.push([{ row: i, uuid: uuidV4(), email: faker.internet.email() }]);
  }
  return array;
}

function generateEmailCSV(array, outputFilePath) {
  let fulltext = 'row,uuid,email\n';
  array.map((row) => {
    fulltext += `${row.row},${row.uuid},${row.email}\n`;
  });
  fs.writeFileSync(outputFilePath, fulltext);
}

exports.default = {
  generateEmailCSV,
};
