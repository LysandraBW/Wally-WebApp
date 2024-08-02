export const objectMatch = <T extends { [k: string | number]: any; }>(
    reference: T, 
    current: T, 
    keys: Array<string | number>
): boolean => {
    for (const key of keys) {
        const referenceValue = reference[`${key}`];
        const currentValue = current[`${key}`];
        if (referenceValue !== currentValue)
            return false;
    }
    return true;
};

export const updatedValue = <T>(referenceValue: T, currentValue: T) => {
    if (referenceValue === currentValue)
        return null;
    return currentValue;
};