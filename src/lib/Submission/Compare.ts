export const sameObject = <T extends {[k: string | number]: any}>(
    reference: T, 
    current: T, 
    objectKeys: Array<string | number>
): boolean => {
    for (const key of objectKeys) {
        const referenceValue = reference[`${key}`];
        const currentValue = current[`${key}`];
        if (referenceValue !== currentValue)
            return false;
    }
    return true;
}

export const updatedValue = <T>(reference: T, current: T) => {
    if (reference === current)
        return null;
    return current;
}