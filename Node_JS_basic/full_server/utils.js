import fs from 'fs/promises';

export default async function readDatabase(filePath) {
  if (!filePath) {
    throw new Error('Cannot load the database');
  }

  try {
    const data = await fs.readFile(filePath, 'utf8');
    const rows = data.trim().split('\n');

    if (rows.length <= 1) {
      return {};
    }

    const fields = {};
    rows.shift();

    for (const row of rows) {
      const trimmedRow = row.trim();

      if (trimmedRow !== '') {
        const [firstName, , , field] = trimmedRow.split(',');

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }
    }

    return fields;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
