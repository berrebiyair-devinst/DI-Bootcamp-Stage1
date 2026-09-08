"use strict";
function validateUnionType(value, allowedTypes) {
    return allowedTypes.includes(typeof value);
}
function validateUnionTyp(value, allowedTypes) {
    return allowedTypes.includes(typeof value);
}
validateUnionTyp("hello", ["string", "number"]);
validateUnionTyp(42, ["string", "number"]);
