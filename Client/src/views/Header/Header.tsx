import { Satoshi } from "@/public/Font";
import clsx from "clsx";

interface HeaderProps {
    header: string;
    paragraph: string;
}

export default function Header(props: HeaderProps) {
    return (
        <div className="flex flex-col items-center border-b border-gray-200 py-8">
            <header className="flex flex-col items-center gap-1">
                <h4 
                    className={clsx(
                        "text-center font-semibold"
                    )}
                >
                    {props.header}
                </h4>
                <p className="text-center text-02 max-w-[400px]">{props.paragraph}</p>
            </header>
        </div>
    )
}