export interface IconStyleProps {
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

export default interface IconProps {
    className?: string;
    style?: IconStyleProps;
}