"use strict";

// write a function that takes arbitrary inputs and...

// returns an integer if the input is an integer
// this includes if the input is an integer in the form of a string

// returns false for non-integers

// not sure how to handle numbers such as 0.00 or 12.0
// Then again, since the toFixed() method returns a string, perhaps JavaScript can't handle sig figs

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
        let negativeAdjustment = 0;
        let outputInt = 0

        if (validChars.indexOf(input[0]) === -1) {
            if (input[0] !== "-") {
                return false;
            } else {
                positive = false;
                negativeAdjustment = 1;
            }
        }

        for (let i = 1; i < input.length; i++) {
            if (validChars.indexOf(input[i]) === -1) {
                return false;
            }
        }

        for (let i = input.length - 1; i >= negativeAdjustment; i--) {
            // implicit type coercion of input[i] from string to number due to multiplication operation
            outputInt += input[i] * 10**(input.length - 1 - i);
        }

        if (!positive) {
            outputInt = -outputInt;
        }

        return outputInt;
    } else {
        return false;
    }
}

// as an aside, it annoys me that type coercion behavior differs amongst the arithmetic operators
// it's well known that "4" + 2 === "42", which is a string since + acts as concatenate on strings
// however...
// "4" * 2 === 8 (a number)
// "4" - 2 === 2 (a number)
// "4" / 2 === 2 (a number)

// ==========================

const integers = [420, "-420", -420, "-420", "-298747248923438"];
const notIntegers = ["8203324a", 420.42, "Tasty Indian Pizza", "143.1", [1], {butThisIsAnInt: 0}, true, false, null, undefined, Infinity, NaN];

const runTests = function(input) {
    const failingTests = [];

    for (let i = 0; i < input.length; i++) {
        if (typeof isInt(input[i]) !== arguments[1]) {
            failingTests[failingTests.length] = i;
        }
    }

    if (failingTests.length !== 0) {
        console.log("Failed tests: ", failingTests);
    }
    else {
        console.log(`All ${arguments[1]} tests passed successfully.`);
    }
}

runTests(integers, "number");
runTests(notIntegers, "boolean");