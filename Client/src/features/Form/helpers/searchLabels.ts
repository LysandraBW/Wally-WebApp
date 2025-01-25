import { Options } from "../DEF";

export default function searchLabels(search: string, options: Options): Options {
    const sortedOptions = [...options];
    sortedOptions.sort((a, b) => a[1].localeCompare(b[1]));
    const matched: Options = [];
    const upperCaseSearch = search.toUpperCase();
    for (let i = 0; i < sortedOptions.length; i++) {
        const [value, label] = sortedOptions[i];
        if (label.toUpperCase().includes(upperCaseSearch))
            matched.push([value, label]);
    }
    return matched;
};