import clsx from "clsx";
import Cover from "./Cover";

// This just covers the screen and plops
// the elements stored in the children
// property on top.

export default function TransparentCover({children, style}: {
    children: React.ReactNode, 
    style?: string
}) {
    return (
        <Cover
            style={style + " bg-white/50 backdrop-blur-none"}
        >
            {children}
        </Cover>
    )
}