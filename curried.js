"use strict";

// sum(2, 3); // 5
// sum(2)(3); // 5

const sum = function(firstNum) {
    if (arguments.length > 1) {
        return arguments[0] + arguments[1];
    } else {
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
    } else {
        return function(secondNum) {
            return function(thirdNum) {
                return firstNum+secondNum+thirdNum;
            }
        }
    }
}

console.log(sum3(2, 3, 4)); // 9
console.log(sum3(2)(3)(4)); // 9


// what about summing an arbitrarily long number of operands?
// sumUnlimited(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55
// sumUnlimited(1)(2)(3)(4)(5)(6)(7)(8)(9)(10); // 55

// well, it's not exactly like the above...
const sumUnlimited = function(arg) {
    if (arguments.length > 1) {
        let sum = 0;
        for (let i = 0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return sum;
    } else {
        let count = arg;
        return function curried(next) {
            if (typeof next !== "number") {
                return count;
            } else {
                count += next;
                return curried;
            }
        }
    }
}

console.log(sumUnlimited(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); // 55
console.log(sumUnlimited(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)("STOP!  HAMMERTIME")); // 55 - need to end with a non-number, though to be fair, () would have sufficed
