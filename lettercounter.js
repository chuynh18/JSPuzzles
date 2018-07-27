"use strict";

const string = "The quick brown fox jumps over the lazy dog.  Sphinx of black quartz, judge my vow.  Cwm fjord bank glyphs vext quiz.";

const letterCount = function(input) {
    const tally = {};
    for (let i = 0; i < input.length; i++) {
        const letter = input[i].toLowerCase();
        if (!tally[letter]) {
            tally[letter] = 1;
        }
        else {
            tally[letter] += 1;
        };
    };
    return tally;
};

console.log(letterCount(string));