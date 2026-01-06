export const sameMap = <T extends {[k: string | number]: any}>(
    prev: T, 
    curr: T, 
    keys: Array<string | number>
): boolean => {
    for (const key of keys) {
        const prevValue = prev[`${key}`];
        const currValue = curr[`${key}`];
        
        if (prevValue !== currValue)
            return false;
    }
    return true;
}
