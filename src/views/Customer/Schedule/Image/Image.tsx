import clsx from "clsx";

export default function Image() {
    return (
        <div 
            className={clsx(
                'relative top-[-64px] h-[calc(100%+64px)] z-[-1]',
                "bg-cover bg-[url('/Images/BlackWhiteBMW.webp')]"
            )}
        />
    )
}