interface ScheduledHeaderProps {
    header: string;
    paragraph: string | React.ReactNode;
}

export default function ScheduledHeader(props: ScheduledHeaderProps) {
    return (
        <div className="flex flex-col justify-self-center items-center relative">
            <header className="flex flex-col items-center w-min relative">
                <h1 className="pb-2 text-[2rem] text-black font-medium text-center whitespace-nowrap">
                    {props.header}
                </h1>
                <p className="font-normal text-gray-500 text-center tracking-wide">
                    {props.paragraph}
                </p>
            </header>
        </div>
    )
}