import { Value, Values } from "../DEF";

export default function toggleValue(values: Values, value: Value): Values {
    const updatedValues = [...values];
    const index = updatedValues.indexOf(value);
    if (index <= -1)
        updatedValues.unshift(value);
    else
        updatedValues.splice(index, 1);
    return updatedValues;
}