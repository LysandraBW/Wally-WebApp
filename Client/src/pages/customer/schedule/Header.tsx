import clsx from "clsx";

interface HeaderProps {
    header: string;
    paragraph: string | React.ReactNode;
}

export default function Header(props: HeaderProps) {
    return (
        <div className="flex flex-col justify-self-center items-center relative">
            <header className="flex flex-col items-center w-min">
                <h4 className={clsx("text-center text-5xl pb-4 text-black font-medium whitespace-nowrap")}>
                    {props.header}
                </h4>
                <p className="text-center font-normal text-lg text-black tracking-wide text-gray-700">{props.paragraph}</p>
            </header>
        </div>
    )
}