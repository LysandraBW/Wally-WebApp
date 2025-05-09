import { Satoshi } from "@/public/Font";
import clsx from "clsx";

interface HeaderProps {
    header: string;
    paragraph: string;
}

export default function Header(props: HeaderProps) {
    return (
        <div className="flex flex-col justify-self-center items-center pt-8 pb-4 border-b border-gray-100 relative min-w-[400px] max-w-[50%] w-[400px]">
            {/* <div className="absolute w-full h-1 left-0 bottom-[-1px] bg-gradient-to-r rounded-2xl from-white from-10% via-white/0 to-90% to-white"></div> */}
            <header className="flex flex-col gap-1">
                <h4 
                    className={clsx(
                        "text-center text-4xl font-medium mb-2"
                    )}
                >
                    {props.header}
                </h4>
                {/* <p className="text-center text-[1rem] text-black max-w-[400px]">{props.paragraph}</p> */}
            </header>
        </div>
        // <div className="flex flex-col items-center p-8 bg-white shadow-sm rounded-2xl border border-gray-200 relative">
        //     <div className="absolute w-full h-full inset-0 bg-gradient-to-r rounded-2xl from-white from-10% to-90% to-white-0"></div>
        //     <header className="flex flex-col items-center gap-1">
        //         <h4 
        //             className={clsx(
        //                 "text-center text-4xl font-medium mb-2"
        //             )}
        //         >
        //             {props.header}
        //         </h4>
        //         {/* <p className="text-center max-w-[400px]">{props.paragraph}</p> */}
        //     </header>
        // </div>
    )
}