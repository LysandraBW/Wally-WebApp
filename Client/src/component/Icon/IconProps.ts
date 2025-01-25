import { CSSProperties } from "react";

export interface IconProps {
    fill?: string;
    color?: string;
    width?: string;
    height?: string;
    stroke?: string;
    strokeWidth?: string;
    shadow?: boolean;
    position?: "relative"|"absolute";
    top?: string;
    left?: string;
    cursor?: "pointer"
}

export const styleIcon = (props: IconProps): CSSProperties => {
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
        filter: props.shadow ? "drop-shadow(0px 1px 0px #0000000A)" : "",
        cursor: props.cursor || "auto"
    }
}