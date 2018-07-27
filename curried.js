"use strict";

// sum(2, 3); // 5
// sum(2)(3); // 5

const sum = function(firstNum) {
    if (arguments.length > 1) {
        return arguments[0] + arguments[1];
    }
    else {
        return function(secondNum) {
            return firstNum+secondNum;
        }
    }
}

console.log(sum(2, 3)); // 5
console.log(sum(2)(3)); // 5

// what about...
// sum(2, 3, 4); // 9
// sum(2)(3)(4); // 9

const sum3 = function(firstNum) {
    if (arguments.length > 1) {
        let sum = 0;
        for (let i = 0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return sum;
    }
    else {
        return function(secondNum) {
            return function(thirdNum) {
                return firstNum+secondNum+thirdNum;
            }
        }
    }
}

console.log(sum3(2, 3, 4)); // 9
console.log(sum3(2)(3)(4)); // 9