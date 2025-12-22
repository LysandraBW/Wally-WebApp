import { CSSProperties } from "react";
import { IconStyleProps } from "./IconProps";

export const styleIcon = (props?: IconStyleProps): CSSProperties => {
    if (!props)
        return {};

    const style = {};
    for (const [property, propertyValue] of Object.entries(props)) {
        (style as any)[`${property}`] = propertyValue;
    }

    return style;
}