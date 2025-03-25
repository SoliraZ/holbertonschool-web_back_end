/* eslint-disable */
import Building from './5-building.js';

export default class SkyHighBuilding extends Building {
    constructor(sqrt, floors) {
        super(sqrt)
        if (typeof floors !== 'number')
            throw new TypeError('Floors must be a number');
        this._floors = floors;
    }

    get floors() {
        return this._floors;
    }

    evacuationWarningMessage() {
        return `Evacuate slowly the ${this._floors} floors`
    }
}