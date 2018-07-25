"use strict"

// example prices
const prices = [1.42, 1.32, 1.45, 1.20, 1.34, 1.74, 1.10, 1.89, 1.42, 1.90];
const decliningPrices = [2, 1.90, 1.7, 1.54, 1.51, 1.50, 1.41, 1.29, 1.1, 0.99, 0.98];

const optimize = function(input) {
    const length = input.length;
    let optimalTrade = -Infinity;
    let buy;
    let sell;

    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j < length; j++) {

            let result = input[j] - input[i];

            if (result > optimalTrade) {
                optimalTrade = result;
                buy = input[i];
                sell = input[j];
            }
        }
    }

    return {
        buyPrice: buy,
        sellPrice: sell,
        profit: parseFloat(optimalTrade.toFixed(2))
    };
};

// test against various prices
console.log(optimize(prices));
console.log(optimize(decliningPrices));