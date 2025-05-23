const http = require('http');
const fs = require('fs').promises;

const db = process.argv.slice(2)[0];
const port = 1245;

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

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  const { url } = req;

  if (url === '/') {
    res.write('Hello Holberton School!');
  } else if (url === '/students') {
    res.write('This is the list of our students\n');
    try {
      const students = await countStudents(db);
      res.end(students);
    } catch (error) {
      res.end(error.message);
    }
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
