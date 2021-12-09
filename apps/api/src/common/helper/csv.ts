import { stringify } from 'csv-stringify';
import { Response } from 'express';

export async function streamCsvFromData<T>(
  columns: Array<{ key: string }>,
  data: T[],
  res: Response,
) {
  const stringifier = stringify({
    header: true,
    columns,
  });

  // Pipe first before writing.
  stringifier.pipe(res);

  for (const row of data) {
    stringifier.write(row);
  }

  return stringifier;
}
