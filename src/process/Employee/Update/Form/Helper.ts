export const objectMatch = <T extends {[k: string|number]: any}> (reference: T, current: T, keys: Array<string|number>): boolean => {
    for (const key of keys) {
        const referenceValue = reference[`${key}`];
        const currentValue = current[`${key}`];
        if (referenceValue !== currentValue)
            return false;
    }
    return true;
}

export const updatedValue = <T> (referenceValue: T, currentValue: T) => {
    if (referenceValue === currentValue)
        return null;
    return currentValue;
}

export class MathSet extends Set {
    intersection(B: MathSet) {
        const common = new MathSet();
        this.forEach(e => {
            if (B.has(e))
                common.add(e);
        });
        return common;
    }

    difference(B: MathSet) {
        const uncommon = new MathSet();
        this.forEach(e => {
            if (!B.has(e))
                uncommon.add(e);
        });
        return uncommon;
    }
}

export const updateMessage = (formPart: string, output: boolean) => {
    if (!output)
        return `Unsuccessfully Updated ${formPart} Information`;
    return `Successfully Updated ${formPart} Information`;
}