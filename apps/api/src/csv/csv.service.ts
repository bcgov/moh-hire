import { stringify } from 'csv-stringify';

import fs from 'fs';
const tempFile = `/tmp/test.csv`;

export class CsvService {
  async generateCsvFromData<T>(columns: Array<{ key: string }>, data: T[]) {
    const outputStream = fs.createWriteStream(tempFile);
    const stringifier = stringify({
      header: true,
      columns,
    });

    stringifier.pipe(outputStream);
    for (const row of data) {
      stringifier.write(row);
    }
  }
}
