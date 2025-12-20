export function sameSemanticMap(a: {[k: string]: string|number}, b: {[k: string]: string|number}) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length != bKeys.length)
        return false;

    console.log(1);
    aKeys.sort();
    bKeys.sort();
    console.log(aKeys);
    console.log(bKeys);
    
    for (let i = 0; i < aKeys.length; i++) {
        if (aKeys[i] != bKeys[i])
            return false;
        if (a[aKeys[i]] != b[bKeys[i]])
            return false;
    }

    return true;
}