/* eslint-disable */
export default function cleanSet(listSet, startString) {
    if (!startString || typeof startString !== 'string') {
        return '';
    }
    return Array.from(listSet)
        .filter((value) => value.startsWith(startString))
        .map((value) => value.slice(startString.length))
        .join('-');
}