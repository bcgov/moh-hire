const fs = require('fs');

function main() {
  const file = fs.readFileSync('./specializations.csv').toString();
  // Remove col names;
  let rows = file.split('\n').slice(1);
  let heirarchy = {};
  let currentStream = '';
  let currentSpecialization = '';
  let currentSubSpecialization = '';

  while (rows.length) {
    const currentRow = rows[0].split(',');
    if (currentRow[0]) {
      currentStream = currentRow[0];
    }
    if (currentRow[1]) {
      currentSpecialization = currentRow[1];
    }
    if (currentRow[2]) {
      currentSubSpecialization = currentRow[2];
    }
    if (currentRow[0]) {
      heirarchy[currentStream.replace(/([^a-zA-Z0-9])/g, '')] = {
        name: currentStream,
        specializations: null,
      };
    }
    if (currentRow[1]) {
      if (heirarchy[currentStream.replace(/([^a-zA-Z0-9])/g, '')].specializations === null) {
        heirarchy[currentStream.replace(/([^a-zA-Z0-9])/g, '')].specializations = {};
      }
      heirarchy[currentStream.replace(/([^a-zA-Z0-9])/g, '')].specializations[
        currentSpecialization.replace(/([^a-zA-Z0-9])/g, '')
      ] = {
        name: currentSpecialization,
        subspecializations: null,
      };
    } else if (currentRow[2]) {
      if (
        heirarchy[currentStream.replace(/([^a-zA-Z0-9])/g, '')].specializations[
          currentSpecialization.replace(/([^a-zA-Z0-9])/g, '')
        ].subspecializations === null
      ) {
        heirarchy[currentStream.replace(/([^a-zA-Z0-9])/g, '')].specializations[
          currentSpecialization.replace(/([^a-zA-Z0-9])/g, '')
        ].subspecializations = {};
      }
      heirarchy[currentStream.replace(/([^a-zA-Z0-9])/g, '')].specializations[
        currentSpecialization.replace(/([^a-zA-Z0-9])/g, '')
      ].subspecializations[currentSubSpecialization.replace(/([^a-zA-Z0-9])/g, '')] = {
        name: currentSubSpecialization,
      };
    }

    rows = rows.splice(1);
  }
  fs.writeFileSync('./streams.json', JSON.stringify(heirarchy), 'utf-8');
}

main();
