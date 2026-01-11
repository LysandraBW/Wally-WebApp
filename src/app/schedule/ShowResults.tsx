import clsx from "clsx";
import { ReactNode } from "react";

interface ShowResultProps {
    Icon: ReactNode;
    head: ReactNode;
    body: ReactNode;
    More: ReactNode;
    success?: boolean;
}

export default function ShowResults(props: ShowResultProps) {
    return (
        <div className="h-full flex flex-col grow items-center grow gap-8 justify-center items-center py-4 bg-black/60 backdrop-blur-sm relative z-10">
            <header className="flex flex-col gap-2 items-center relative">
                <h1 
                    className={clsx(
                        "text-3xl text-base-900 font-medium text-center tracking-tight",
                        props.success === true && "!text-blue-500",
                        props.success === false && "!text-red-500"
                    )}
                >
                    {props.head}
                </h1>
                <p className="text-sm text-base-700 text-center tracking-wide max-w-[300px]">
                    {props.body}
                </p>
            </header>
            <div className="flex justify-center w-full">
                {props.More}
            </div>
        </div>
    )
}