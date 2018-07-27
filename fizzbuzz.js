"use strict";

// console.log out 1 through 100
// if the number is divisible by 3, print Fizz
// if the number is divisible by 5, print Buzz
// if the number is divisible by both 3 and 5, print FizzBuzz

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(i, "FizzBuzz");
    }
    else if (i % 3 === 0) {
        console.log(i, "Fizz");
    }
    else if (i % 5 === 0) {
        console.log(i, "Buzz");
    }
    else {
        console.log(i);
    };
};