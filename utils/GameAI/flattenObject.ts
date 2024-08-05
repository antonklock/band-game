function flattenObject(
    obj: Record<string, any>,
    prefix = ""
): Record<string, any> {
    return Object.keys(obj).reduce((acc: Record<string, any>, k: string) => {
        const pre = prefix.length ? prefix + "." : "";
        if (
            typeof obj[k] === "object" &&
            obj[k] !== null &&
            !Array.isArray(obj[k])
        ) {
            Object.assign(acc, flattenObject(obj[k], pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
}

export { flattenObject };