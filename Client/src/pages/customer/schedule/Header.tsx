import clsx from "clsx";

interface HeaderProps {
    header: string;
    paragraph: string | React.ReactNode;
}

export default function Header(props: HeaderProps) {
    return (
        <div className="flex flex-col justify-self-center items-center relative">
            <header className="flex flex-col items-center w-min">
                <h1 className={clsx("text-center text-[2rem] pb-4 text-black font-medium whitespace-nowrap")}>
                    {props.header}
                </h1>
                <p className="text-center font-normal text-[1rem] text-black tracking-wide text-gray-700">{props.paragraph}</p>
            </header>
        </div>
    )
}