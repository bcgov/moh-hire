const fs = require('fs');
const uuidV4 = require('uuid').v4;
const faker = require('faker');

function main() {
  const columns = ['row', 'id', 'email'];

  let fulltext = 'row,id,email,\n';
  for (let i = 0; i < 10000; i++) {
    fulltext += [i, uuidV4(), faker.internet.email()].join(',') + '\n';
  }
  fs.writeFileSync('./src/scripts/emails.csv', fulltext);
}

main();
