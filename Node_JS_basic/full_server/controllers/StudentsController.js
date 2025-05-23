import readDatabase from '../utils';

export default class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const path = process.argv[2];
      const data = await readDatabase(path);
      let output = 'This is the list of our students';

      const sortedFields = Object.keys(data).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

      for (const field of sortedFields) {
        const students = data[field];
        output += `\nNumber of students in ${field}: ${students.length}. List: ${students.join(', ')}`;
      }

      res.status(200).send(output);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (!['CS', 'SWE'].includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const path = process.argv[2];
      const data = await readDatabase(path);
      const students = data[major];
      if (!students) {
        return res.status(500).send('Cannot load the database');
      }

      return res.status(200).send(`List: ${students.join(', ')}`);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}
