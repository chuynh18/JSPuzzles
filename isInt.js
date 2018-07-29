"use strict";

// write a function that takes arbitrary inputs and...

// returns an integer if the input is an integer
// this includes if the input is an integer in the form of a string

// returns false for non-integers

const isInt = function(input) {
    if (typeof input === "number") {
        if (input % 1 === 0) {
            return input;
        } else {
            return false;
        }
    } else if (typeof input === "string") {
        const validChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let positive = true;
        let reversedInput = "";
        let negativeAdjustment = 0;
        let outputInt = 0

        if (validChars.indexOf(input[0]) === -1) {
            if (input[0] !== "-") {
                return false;
            } else {
                positive = false;
            }
        }

        for (let i = 1; i < input.length; i++) {
            if (validChars.indexOf(input[i]) === -1) {
                return false;
            }
        }

        if (!positive) {
            negativeAdjustment = 1;
        }

        for (let i = input.length - 1; i >= negativeAdjustment; i--) {
            reversedInput += input[i];
        }

        for (let i = 0; i < reversedInput.length; i++) {
            outputInt += reversedInput[i] * 10**i;
        }

        if (!positive) {
            outputInt = -outputInt;
        }

        return outputInt;
    } else {
        return false;
    }
}

// ==========================

console.log(isInt(420)); // 420
console.log(isInt("420")); // 420
console.log(isInt(-420)); // -420
console.log(isInt("-123")); // -123
console.log(isInt("-983245798234")); // -983245798234
console.log(isInt("428123a")); // false
console.log(isInt(420.69)); // false
console.log(isInt("Tasty Indian Pizza")); // false
console.log(isInt("543.1")); // false
console.log(isInt([1])); // false
console.log(isInt({butThisIsAnInt: 0})); // false
console.log(isInt(true)); // false
console.log(isInt(null)); // false
console.log(isInt(undefined)); // false
console.log(isInt(Infinity)); // 
console.log(isInt(NaN)); // false