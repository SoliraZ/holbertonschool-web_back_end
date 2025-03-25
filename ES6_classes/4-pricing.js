/* eslint-disable */
import Currency from "./3-currency.js";
export default class Pricing {
    constructor(amount, currency) {
        this._amount = amount;
        this._currency = currency;
    }

    get amount() {
        return this._amount;
    }

    set amount(newAmount) {
        if (typeof newAmount !== number)
            throw TypeError('Amount must be a number');
        this._amount = newAmount;
    }

    get currency() {
        return this._currency;
    }

    set currency(isCurrency) {
        if (!(currency instanceof Currency))
            throw TypeError('Currency is not in the currency instance');
        this._currency = isCurrency;
    }

    displayFullPrice() {
        return `${this._amount} ${this._currency.name} ${this._currency.code}`
    }
}