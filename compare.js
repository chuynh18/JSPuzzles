// ============= stuff to compare =================

const string1 = "Here's a string.";
const string2 = "Here's a string.";
const string3 = "Here's a different string.";

const array1 = [1, 2, 3];
const array2 = [1, 2, 3];
const array3 = [2, 4, 6];

const obj1 = {
    key1:  "this is a basic object"
};
const obj2 = {
    key1:  "this is a basic object"
};
const obj3 = {
    key1:  "this is a different basic object"
};

const nestedArray1 = [
    1,
    2,
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3]},
    "string"
];
const nestedArray2 = [
    1,
    2,
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3]},
    "string"
];
const nestedArray3 = [
    1,
    2,
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3, [4]]},
    "string"
];

const containsUndefined1 = [
    1,
    undefined,
    2,
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3, [4]]},
    "string",
    "undefined"
];
const containsUndefined2 = [
    1,
    undefined,
    2,
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3, [4]]},
    "string",
    "undefined"
];
const containsUndefined3 = [
    1,
    undefined,
    2,
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3, [4]]},
    "string",
    "defined"
];

const containsNaN1 = [
    1,
    {},
    2,
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3, [4], NaN]},
    "string",
    "defined"
];
const containsNaN2 = [
    1,
    {},
    2,
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3, [4], NaN]},
    "string",
    "defined"
];
const containsNaN3 = [
    1,
    {},
    2,
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3, [4], NaN]},
    "string",
    "defined1"
];

// ============= functionality =================

const decide = function(input1, input2) {
    let match = true;

    if (typeof input1 !== typeof input2) {
        return false;
    }
    else if (typeof input1 === "string" && typeof input2 === "string") {
        match = stringNumCompare(input1, input2);
    }
    else if (typeof input1 === "number" && typeof input2 === "number") {
        match = stringNumCompare(input1, input2);
    }
    else if (typeof input1 === "undefined" && typeof input2 === "undefined") {
        console.log("warning:  did you mean to pass undefined values for comparison?");
        match = stringNumCompare(input1, input2);
    }
    else if (Array.isArray(input1) && (Array.isArray(input2))) {
        match = arrayCompare(input1, input2);
    }
    else {
        match = objCompare(input1, input2);
    };

    return match;
};

const stringNumCompare = function(input1, input2) {
    if (input1 !== input1 || input2 !== input2) {
        console.log("warning:  NaN was possibly compared.  Did you mean to pass NaN?");
        console.log("warning:  the false you received may be spurious.");
    };

    if (input1 === input2) {
        return true;
    }
    else {
        return false;
    };
};

const arrayCompare = function(input1, input2) {
    let match = true;

    if (input1.length !== input2.length) {
        return false;
    };

    for (let i = 0; i < input1.length; i++) {
        if (match) {
            match = decide(input1[i], input2[i]);
        }
        else {
            break;
        };
    };

    return match;
};

const objCompare = function(input1, input2) {
    const keys1 = Object.keys(input1);
    const keys2 = Object.keys(input2);
    let match = true;

    if (keys1.length !== keys2.length) {
        return false;
    };

    for (let i = 0; i < keys1.length; i++) {
        if (keys1[i] !== keys2[i]) {
            return false;
        };
    };

    for (let i = 0; i < keys1.length; i++) {
        if (match) {
            match = decide(input1[keys1[i]], input2[keys2[i]]);
        }
        else {
            break;
        };
    };

    return match;
};

// ============= tests =================

console.log("basic strings...");
console.log("expecting true: ", decide(string1, string2)); // true
console.log("expecting false: ", decide(string1, string3)); // false
console.log("===========================");
console.log("basic arrays...");
console.log("expecting true: ", decide(array1, array2)); // true
console.log("expecting false: ", decide(array1, array3)); // false
console.log("===========================");
console.log("basic objects...");
console.log("expecting true: ", decide(obj1, obj2)); // true
console.log("expecting false: ", decide(obj1, obj3)); // false
console.log("===========================");
console.log("nested arrays...");
console.log("expecting true: ", decide(nestedArray1, nestedArray2)); // true
console.log("expecting false: ", decide(nestedArray1, nestedArray3)); // false
console.log("===========================");
console.log("nested arrays containing undefined...");
console.log("expecting true: ", decide(containsUndefined1, containsUndefined2)); // true
console.log("expecting false: ", decide(containsUndefined1, containsUndefined3)); // false
console.log("===========================");
console.log("nested arrays containing NaN...");
console.log("expecting true: ", decide(containsNaN1, containsNaN2)); // actually, false
console.log("expecting false: ", decide(containsNaN1, containsNaN3)); // false