function validateUnionType(
    value: string | number,
    allowedTypes: string[]
): boolean {
    return allowedTypes.includes(typeof value);
}

function validateUnionTyp(
    value: any,
    allowedTypes: string[]
): boolean {
    return allowedTypes.includes(typeof value);
}

validateUnionTyp("hello", ["string", "number"]);
validateUnionTyp(42, ["string", "number"]);
