import { Instrumental } from "@/public/Font";
import clsx from "clsx";

interface HeaderProps {
    header: string;
    paragraph: string | React.ReactNode;
}

export default function Header(props: HeaderProps) {
    return (
        <div className="flex flex-col justify-self-center items-center relative">
            <header className="flex flex-col items-center w-min relative">
                <h1 
                    className={clsx(
                        "pb-2",
                        "text-[2rem] text-black font-medium",
                        "text-center whitespace-nowrap"
                    )}
                >
                    {props.header}
                </h1>
                <p
                    className={clsx(
                        Instrumental.className,
                        "font-normal text-gray-500",
                        "text-center tracking-wide"
                    )}
                >
                    {props.paragraph}
                </p>
            </header>
        </div>
    )
}