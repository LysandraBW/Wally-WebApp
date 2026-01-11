import BoltIcon from "../Icons/Icons/BoltIcon";
import clsx from "clsx";

export default function Logo(props: {white?: boolean; blue?: boolean; metallic?: boolean; svgClassName?: string; textClassName?: string}) {
    return (
        <div
            className="w-min font-ibm cursor-pointer"
        >
            <a 
                href="/" 
                className="flex items-center gap-1 relative"
            >
                <div className="relative">
                    <BoltIcon
                        className={clsx(
                            "relative z-20",
                            "size-[14px] stroke-[1.25px] stroke-black fill-black",
                            props.white && "!stroke-white !fill-white",
                            props.metallic && "!stroke-gray-400 !fill-gray-300",
                            props.svgClassName
                        )}
                    />
                </div>
                <div className="relative h-min">
                    <span 
                        className={clsx(
                            "block relative z-10",
                            "text-base text-black dark:text-white tracking-tighter font-medium",
                            props.blue && "bg-gradient-to-b from-blue-500 to-blue-500 inline-block text-transparent bg-clip-text",
                            props.white && "text-white",
                            props.metallic && "!font-normal !bg-gradient-to-br !from-gray-400 !from-20% !via-gray-400/75 dark:!via-gray-300 !to-80% dark:!to-80% !to-gray-400 dark:!to-gray-400 !inline-block !text-transparent !bg-clip-text",
                            props.textClassName
                        )}
                    >
                        WALTRONICS
                    </span>
                </div>
            </a>
        </div>
    )
}