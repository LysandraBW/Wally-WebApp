import { Options, OptionMap } from "../DEF";

export default function getValuesToLabels(options: Options): OptionMap {
    const map: OptionMap = {};
    for (const option of options)
        map[option[0]] = option[1];
    return map;
}