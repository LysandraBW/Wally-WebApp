import Header from "@/pages/customer/schedule/Header";

interface BadResultsProps {
    restart: () => void;
}

export default function BadResults(props: BadResultsProps) {
    return (
        <div className="flex flex-col items-center justify-center grow gap-10">
            <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 drop-shadow/50 stroke-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <Header
                header="Something Went Wrong"
                paragraph={<>Please try to schedule your appointment again.<br/>If this error continues, please call us at 000-000-0000.</>}
            />
            <div className="flex justify-center min-w-[200px]">
                <button 
                    onClick={props.restart} 
                    className="rounded-lg px-4 py-2 w-full bg-white text-black border border-gray-200 text-04 tracking-wide font-medium shadow-sm hover:bg-gray-900 hover:border-gray-900 hover:text-white transition-all"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}