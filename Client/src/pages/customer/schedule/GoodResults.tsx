import Copy from "@/component/Copy/Copy";
import Header from "@/pages/customer/schedule/Header";

interface GoodResultsProps {
    output: [string, string];
}

export default function GoodResults(props: GoodResultsProps) {
    return (
        <div className="flex flex-col grow justify-center items-center gap-10">
            <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 drop-shadow/50 stroke-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <Header
                header="Appointment Scheduled"
                paragraph={<>Your appointment will be confirmed in 1-2 days. In the meantime, use the information below to check on your appointment. Thank you for trusting us at Waltronics.</>}
            />
            {/* 
                The user can click these buttons to 
                copy their ID and email address.
            */}
            <div className="flex flex-col gap-2 items-center justify-end">
                <Copy
                    label="ID"
                    value={props.output[0] || ""}
                />
                <Copy
                    label="Email"
                    value={props.output[1] || ""}
                />
            </div>
        </div>
    )
}