export function sameSemanticMap(a: {[k: string]: string|number}, b: {[k: string]: string|number}) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length != bKeys.length)
        return false;

    aKeys.sort();
    bKeys.sort();
    
    for (let i = 0; i < aKeys.length; i++) {
        if (aKeys[i] != bKeys[i])
            return false;
        if (a[aKeys[i]] != b[bKeys[i]])
            return false;
    }

    return true;
}