/* eslint-disable */
export default function hasValuesFromArray(setlist, array) {
    return array.every((element) => setlist.has(element));
}