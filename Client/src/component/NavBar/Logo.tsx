import { IBM } from "@/public/fonts/Font";
import BoltIcon from "../Icons/Icons/BoltIcon";
import clsx from "clsx";

export default function Logo(props: {white?: boolean}) {
    return (
        <div
            className={`${IBM.className} w-min cursor-pointer`}
        >
            <a 
                href="/" 
                className="flex items-center gap-1"
            >
                <BoltIcon
                    className={clsx(
                        "size-4 stroke-[1.25px] stroke-blue-500 fill-blue-500",
                        props.white && "stroke-white fill-white"
                    )}
                />
                <span 
                    className={clsx(
                        "block text-black dark:text-white tracking-tight font-medium",
                        props.white && "text-white"
                    )}
                >
                    WALTRONICS
                </span>
            </a>
        </div>
    )
}