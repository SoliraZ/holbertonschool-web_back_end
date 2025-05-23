const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;
const db = process.argv.slice(2)[0];

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const rows = data.trim().split('\n').slice(1);
    const fields = {};

    rows.forEach((row) => {
      const columns = row.split(',');
      const [firstname, , , field] = columns;
      if (firstname && field) {
        if (!fields[field]) {
          fields[field] = [];
        }
      }
      fields[field].push(firstname);
    });

    let output = `Number of students: ${rows.length}`;
    for (const [field, students] of Object.entries(fields)) {
      output += `\nNumber of students in ${field}: ${students.length}. List: ${students.join(', ')}`;
    }
    return output;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.set('Content-Type', 'text/plain;charset=utf-8');
  res.write('This is the list of our students\n');
  try {
    const students = await countStudents(db);
    res.end(students);
  } catch (error) {
    res.end(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
