import { Inter } from "@/public/Font/Font";
import clsx from "clsx";

export default function Header() {
    const HEADER = "Schedule an Appointment";
    const PARAGRAPH = "Book your ride's tune-up in seconds. We'll confirm fast. See you soon.";

    return (
        <div className='w-full flex justify-center'>
            <header className='w-min'>
                <h1 className={clsx(
                    Inter.className,
                    'mb-4 text-center whitespace-nowrap'
                )}>{HEADER}</h1>
                <p className={clsx(
                    'text-center'
                )}>{PARAGRAPH}</p>
            </header>
        </div>
    )
}