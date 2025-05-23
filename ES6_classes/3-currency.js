/* eslint-disable */
export default class Currency {
    constructor(code, name) {
        this._code = code;
        this._name = name;
    }

    get code() {
        return this._code;
    }

    set code(newCode) {
        if (typeof newCode !== String)
            throw TypeError('Code must be a string')
        this._code = newCode;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        if (typeof newName !== String)
            throw TypeError('Name must be a string');
        this._name = newName;
    }

    displayFullCurrency() {
        return `${this._name} (${this._code})`;
    }
}