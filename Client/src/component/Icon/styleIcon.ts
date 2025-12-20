import { CSSProperties } from "react";
import { IconStyleProps } from "./IconProps";

export const styleIcon = (props?: IconStyleProps): CSSProperties => {
    if (!props)
        return {};

    return {
        fill: props.fill || "#000",
        color: props.color || "#000",
        width: props.width || "12",
        height: props.height || "12",
        stroke: props.stroke || "#000",
        strokeWidth: props.strokeWidth || "0",
        position: props.position || "relative",
        top: props.top || "0px",
        left: props.left || "0px",
        filter: props.shadow ? "drop-shadow(0px 1px 0px #000000)" : "",
        cursor: props.cursor || "auto"
    };
}