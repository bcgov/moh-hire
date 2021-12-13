const fs = require('fs');

const alphaNumeric = str => {
  return str.replace(/([^a-zA-Z0-9])/g, '');
};

function main() {
  const file = fs.readFileSync('./specialties.csv').toString();
  // Remove col names;
  let rows = file.split('\n').slice(1);
  let heirarchy = {
    streams: {
      byId: {},
      allIds: [],
    },
    specialties: {
      byId: {},
      allIds: [],
    },
    subspecialties: {
      byId: {},
      allIds: [],
    },
  };

  let currentStream = '';
  let currentStreamName = '';
  let currentSpecialty = '';
  let currentSpecialtyName = '';
  let currentSubspecialty = '';
  let currentSubspecialtyName = '';

  while (rows.length) {
    const currentRow = rows[0].split(',');

    if (currentRow[0]) {
      currentStream = alphaNumeric(currentRow[0]);
      currentStreamName = currentRow[0];
    }
    if (currentRow[1]) {
      currentSpecialty = alphaNumeric(currentRow[1]);
      currentSpecialtyName = currentRow[1];
    }
    if (currentRow[2]) {
      currentSubspecialty = alphaNumeric(currentRow[2]);
      currentSubspecialtyName = currentRow[2];
    }

    if (currentStream) {
      if (!heirarchy.streams.byId[currentStream]) {
        heirarchy.streams.byId[currentStream] = {
          id: currentStream,
          name: currentStreamName,
          specialties: [],
        };
        heirarchy.streams.allIds.push(currentStream);
      }
    }

    if (currentSpecialty) {
      if (!heirarchy.specialties.byId[currentSpecialty]) {
        heirarchy.specialties.byId[currentSpecialty] = {
          id: currentSpecialty,
          name: currentSpecialtyName,
          subspecialties: [],
        };
        heirarchy.specialties.allIds.push(currentSpecialty);
      }
      if (
        heirarchy.streams.byId[currentStream] &&
        heirarchy.streams.byId[currentStream].specialties.indexOf(currentSpecialty) === -1
      ) {
        heirarchy.streams.byId[currentStream].specialties.push(currentSpecialty);
      }
    }

    if (currentSubspecialty) {
      if (!heirarchy.subspecialties.byId[currentSubspecialty]) {
        heirarchy.subspecialties.byId[currentSubspecialty] = {
          id: currentSubspecialty,
          name: currentSubspecialtyName,
        };
        heirarchy.subspecialties.allIds.push(currentSubspecialty);
      }
      if (
        heirarchy.specialties.byId[currentSpecialty] &&
        heirarchy.specialties.byId[currentSpecialty].subspecialties.indexOf(currentSubspecialty) ===
          -1
      ) {
        heirarchy.specialties.byId[currentSpecialty].subspecialties.push(currentSubspecialty);
      }
    }

    rows = rows.splice(1);
  }
  fs.writeFileSync('./streams.json', JSON.stringify(heirarchy), 'utf-8');
}

main();
