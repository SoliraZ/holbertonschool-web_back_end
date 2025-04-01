/* eslint-disable */
export default function updateStudentGradeByCity(students, city, newGrades) {
    const studentsInCity = students.filter(student => student.location === city);

    const updatedStudents = studentsInCity.map(student => {
        const gradeEntry = newGrades.find(grade => grade.studentId === student.id);
        return {
            ...student,
            grade: gradeEntry ? gradeEntry.grade : 'N/A'
        };
    });

    return updatedStudents;
}
