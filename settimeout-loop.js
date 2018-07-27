"use strict";

// uncomment the appropriate block of code to run


/* Why is this broken?
Due to i being declared using var, which has interesting behavior, to say the least
even though i is locally scoped, it's (pardon the terminology) "globally" local.
Perhaps more precisely, the scope is the entire local function.
The loop runs through five times as expected.
The setTimeout behaves as expected (i is 0, 1, 2, 3, 4).
But when the setTimeout actually fires, all five setTimeouts
refer to the same variable i, which has now been incremented to 5.
Thus, 5 is printed 5 times, each one second apart. */

// for (var i = 0; i < 5; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 1000*i);
// };



/* global variable counter and recursion
this isn't a real answer to "fix the for loop" since it's not using a for loop
it behaves the same way, though. */

// var counter = 0;
// var count = function() {
//     console.log(counter);
//     counter++;
//     if (counter < 5) {
//         setTimeout(count, 1000);
//     }  
// }
// count();



/* The classical fix to the problem before ES6 let
the IIFE is invoked each loop with i being passed in as the input
this way, the inner function has the "old" value of i */

// for (var i = 0; i < 5; i++) {
//     (function(input) {
//         setTimeout(function() {
//             console.log(input);
//         }, 1000*input);
//     })(i);
// };



/* This is functionally exactly the same as the IIFE above */

// var count = function(input) {
//     setTimeout(function() {
//         console.log(input);
//     }, 1000*input);
// };
// for (var i = 0; i < 5; i++) {
//     count(i);
// };



/* This uses ES6 let (block scoping)
each instance of i is a different variable */

// for (let i = 0; i < 5; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 1000*i);
// };