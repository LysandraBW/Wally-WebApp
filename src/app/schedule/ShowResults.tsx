import Logo from "@/component/NavBar/Logo";
import { ReactNode } from "react";

interface ShowResultProps {
    Icon: ReactNode;
    head: string;
    body: string;
    More: ReactNode;
}

export default function ShowResults(props: ShowResultProps) {
    return (
        <div className="h-full flex flex-col grow items-center justify-center grow gap-10">
            <div className="flex justify-center items-center">
                {props.Icon}
            </div>
            <div className="flex flex-col justify-self-center items-center relative">
                <header className="flex flex-col gap-2 items-center relative">
                    <div className="md:hidden">
                        <Logo/>
                    </div>
                    <h1 className="text-2xl text-base-900 font-medium text-center tracking-tight">
                        {props.head}
                    </h1>
                    <p className="text-base text-base-500 text-center font-normal tracking-wide max-w-[420px]">
                        {props.body}
                    </p>
                </header>
            </div>
            <div className="flex justify-center">
                {props.More}
            </div>
        </div>
    )
}