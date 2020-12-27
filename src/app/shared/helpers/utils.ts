export function getEnumAsArray(enumObj): string[] {
    return Object.keys(enumObj).map((key) => enumObj[key]);
}
