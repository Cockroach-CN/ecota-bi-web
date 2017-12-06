export function assign(target, ...sources) {
    if (target === null || target === undefined) {
        throw new TypeError("Cannot convert undefined or null to object");
    }
    const result = Object(target);
    sources.forEach((source) => {
        if (source !== undefined && source !== null) {
            for (let nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                    result[nextKey] = source[nextKey];
                }
            }
        }
    });
    return result;
}