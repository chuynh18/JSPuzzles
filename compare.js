// ============= functionality =================

// feed what you want to compare into this function
const decide = function(input1, input2) {
    let match = true;

    if (typeof input1 !== typeof input2) {
        return false;
    }
    else if (typeof input1 === "symbol") {
        console.log("warning:  you attempted to compare symbols.  Symbols are supposed to be unique.");
        return false;
    }
    // since I already checked that the input types match, I only need to check the type of one of the inputs
    else if (typeof input1 === "boolean" || typeof input1 === "string" || typeof input1 === "number") {
        match = compare(input1, input2);
    }
    else if (typeof input1 === "function") {
        console.log("warning:  did you mean to pass a function for comparison?");

        const input1ToString = input1.toString();
        const input2ToString = input2.toString();

        match = compare(input1ToString, input2ToString);
    }
    else if (input1 === null) {
        console.log("warning:  did you mean to pass null values for comparison?");
        match = compare(input1, input2);
    }
    else if (typeof input1 === "undefined") {
        console.log("warning:  did you mean to pass undefined values for comparison?");
        match = compare(input1, input2);
    }
    else if (Array.isArray(input1)) {
        match = arrayCompare(input1, input2);
    }
    else {
        match = objCompare(input1, input2);
    };

    return match;
};

// handles strings, numbers, undefined, NaN (will fail on NaN, but warn the user that NaN was received)
const compare = function(input1, input2) {
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

// handles arrays
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

// handles objects
const objCompare = function(input1, input2) {
    const keys1 = Array.from(Object.keys(input1)).sort();
    const keys2 = Array.from(Object.keys(input2)).sort();
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

// ============= stuff to compare =================

// 1 and 2 are always the same, anything else differs

const string1 = "Here's a string.";
const string2 = "Here's a string.";
const string3 = "Here's a string. ";
const string4 = "Here's a different string.";

const array1 = [1, 2, 3];
const array2 = [1, 2, 3];
const array3 = [2, 4, 6];
const array4 = [1, 2, 3, 4];

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
    {},
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3, [4]]},
    "string"
];

const containsUndefined1 = [
    1,
    undefined,
    {},
    [2, 3],
    {key: "value"},
    {anotherKey: [1, 2, 3, [4]]},
    "string",
    "undefined"
];
const containsUndefined2 = [
    1,
    undefined,
    {},
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

const complexObj1 = {
    key1: "just a string",
    key2: [true, 1, 2, 3],
    key3: ["just an array ", "containing strings"],
    key4: {
        nestedKey1: "another object",
        nestedKey2: {
            nestednestedKey1: "inception",
            nestednestedKey2: [3, 2, 1, 0, -1]
        },
        nestedKey3: undefined
    },
    key5: [
        {},
        {
            thisIsGettingOutOfHand: [null, null, null]
        }
    ]
};

// note the scrambled order of keys compared to complexObj1
const complexObj2 = {
    key5: [
        {},
        {
            thisIsGettingOutOfHand: [null, null, null]
        }
    ],
    key2: [true, 1, 2, 3],
    key1: "just a string",
    key3: ["just an array ", "containing strings"],
    key4: {
        nestedKey1: "another object",
        nestedKey2: {
            nestednestedKey1: "inception",
            nestednestedKey2: [3, 2, 1, 0, -1]
        },
        nestedKey3: undefined
    }
};
const complexObj3 = {
    key1: "just a string",
    key2: [true, 1, 2, 3],
    key3: ["just an array ", "containing strings"],
    key4: {
        nestedKey1: "another object",
        nestedKey2: {
            nestednestedKey1: "inception",
            nestednestedKey2: [3, 2, 1, 0, -1]
        },
        nestedKey3: undefined
    },
    key5: [
        {},
        {
            thisIsGettingOutOfHand: [null, "", undefined]
        }
    ]
};

// ============= tests =================
// Simple strings
console.log("basic strings...");
console.log("expecting true: ", decide(string1, string2)); // true
console.log("expecting false: ", decide(string1, string3)); // false
console.log("expecting false: ", decide(string1, string4)); // false
console.log("\n===========================\n");

// Simple arrays
console.log("basic arrays...");
console.log("expecting true: ", decide(array1, array2)); // true
console.log("expecting false: ", decide(array1, array3)); // false
console.log("expecting false: ", decide(array1, array4)); // false
console.log("\n===========================\n");

// Simple objects
console.log("basic objects...");
console.log("expecting true: ", decide(obj1, obj2)); // true
console.log("expecting false: ", decide(obj1, obj3)); // false
console.log("\n===========================\n");

// Nested arrays (containing numbers, strings, objects, and arrays)
console.log("nested arrays...");
console.log("expecting true: ", decide(nestedArray1, nestedArray2)); // true
console.log("expecting false: ", decide(nestedArray1, nestedArray3)); // false
console.log("\n===========================\n");

// Nested arrays (but also contains undefined)
console.log("nested arrays containing undefined...");
console.log("expecting true: ", decide(containsUndefined1, containsUndefined2)); // true
console.log("expecting false: ", decide(containsUndefined1, containsUndefined3)); // false
console.log("\n===========================\n");

// Nested arrays (but also contains NaN)
console.log("nested arrays containing NaN...");
console.log("because NaN !== NaN, these will come out false, but I warn the user!");
console.log("expecting false: ", decide(containsNaN1, containsNaN2)); // actually, false
console.log("expecting false: ", decide(containsNaN1, containsNaN3)); // false
console.log("\n===========================\n");

// Nested objects (also containing arrays, objects, null, undefined)
console.log("messy objects...");
console.log("expecting true: ", decide(complexObj1, complexObj2)); // true
console.log("expecting false: ", decide(complexObj1, complexObj3)); // false