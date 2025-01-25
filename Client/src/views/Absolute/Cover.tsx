import clsx from "clsx";

// This just covers the screen and plops
// the elements stored in the children
// property on top.

export default function Cover({children, style}: {
    children: React.ReactNode, 
    style?: string
}) {
    return (
        <div className={clsx(
            "w-full h-full",
            "bg-black/50 backdrop-blur-sm",
            "fixed top-0 left-0 z-[80]",
            "flex justify-center",
            style
        )}>{children}</div>
    )
}