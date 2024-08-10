import clsx from "clsx";

export default function Image() {
    return (
        <div 
            className={clsx(
                'relative top-[-64px] h-[calc(100%+64px)] z-[-1]',
                "bg-cover bg-[url('/Images/BMWShip.jpg')] bg-no-repeat bg-center",
                // 'after:relative after:block after:w-full after:h-full after:bg-black'
            )}
        />
    )
}