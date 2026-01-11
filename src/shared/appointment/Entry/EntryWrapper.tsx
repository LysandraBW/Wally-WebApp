import { ReactNode, useEffect } from "react";
import resizeMainContent from "../resizeMainContent";

// This is to implement the overflowing property for all the entries.
// I've also added the MainContent ID here, because why not.

export default function EntryWrapper(props: {entries: ReactNode; saveResetButtons: ReactNode;}) {
    useEffect(() => {
        resizeMainContent();
        window.addEventListener("resize", resizeMainContent);
    }, []);


    return (
        <div 
            id="MainContent"
            className="w-full grow grid grid-rows-[minmax(0,1fr)_48px] overflow-y-clip"
        >
            <div className="w-full h-full overflow-y-auto">
                <div className="w-full h-min grid grid-cols-[124px_auto] bg-base-0 dark:bg-base-50">
                    {props.entries}
                </div>
            </div>
            {props.saveResetButtons}
        </div>
    )
}