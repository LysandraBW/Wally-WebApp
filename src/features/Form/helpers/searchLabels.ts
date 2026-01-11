import { Options, OptionsWithNode } from "../DEF";

export default function searchLabels<A extends Options | OptionsWithNode>(search: string, options: A, sortNums: boolean = false): A {
    const sortedOptions = [...options] as A;

    if (sortNums)
        sortedOptions.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
    else
        sortedOptions.sort((a, b) => a[1].localeCompare(b[1]));
    
    const matched: A = [] as any;
    const upperCaseSearch = search.toUpperCase();
    
    for (let i = 0; i < sortedOptions.length; i++) {
        const [value, label] = sortedOptions[i];
        
        if (label.toUpperCase().includes(upperCaseSearch))
            matched.push([...sortedOptions[i]] as any);
    }

    return matched;
};