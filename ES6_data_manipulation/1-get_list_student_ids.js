/* eslint-disable */
export default function getListStudentIds(Students) {
    if (Array.isArray(Students) && Students.every((item) => typeof item === 'object' && item !== null)) {
        return Students.map((item) => item.id);
    }
    return[]
}