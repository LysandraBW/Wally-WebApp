import Logo from "./Logo";

interface ProgressNavigationProps {
    doneLength: string;
    notDoneLength: string;
}

export default function ProgressNavigation(props: ProgressNavigationProps) {
    return (
        <div className="sticky top-0 z-30 ">
            {/* 
            "Navigation",
            It's just the Logo right now.
            */}
            <nav className={"flex justify-between items-center gap-x-8 px-4 py-3 bg-white z-30"}>
                <Logo/>
            </nav>
            {/* Progress */}
            <div className="flex items-start px-0">
                {/* Completed Bar */}
                <div className={`w-[${props.doneLength}%] flex flex-col items-end`}>
                    <div className={"h-[1px] w-full bg-blue-700"}/>
                </div>
                {/* Uncompleted Bar */}
                <div className={`w-[${props.notDoneLength}%]`}>
                    <div className="w-full h-[1px] w-full bg-gray-200"/>
                </div>
            </div>
        </div>
    )
}