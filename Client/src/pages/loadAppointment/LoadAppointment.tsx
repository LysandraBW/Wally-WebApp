import clsx from "clsx";
import { UseForm } from "../../features/Form/useForm/useForm";
import { Tooltip } from "react-tooltip";

interface LoadAppointmentProps {
    form: UseForm;
    head: string;
    paragraph: string;
    loadAppointment: () => void;
    appointmentNotFound: boolean;
    setAppointmentNotFound: (b: boolean) => void;
}

export default function LoadAppointment(props: LoadAppointmentProps) {
    return (
         <div className="flex flex-col gap-6 grow p-8 items-center justify-center border border-gray-300">
            <div>
                <p className="whitespace-nowrap text-center text-xl text-gray-700 font-medium">
                    {props.head}
                </p>
                <span className="text-center block tracking-wide text-gray-400 font-normal max-w-[350px]">
                    {props.paragraph}
                </span>
            </div>
            <div>
                <div 
                    id="loadInput"
                    className={clsx(
                        "w-[350px] flex gap-1 p-1 pl-2 h-[36px]",
                        "bg-white border border-gray-300 shadow-sm rounded-lg",
                        "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
                    )}
                >
                    <input
                        name="id"
                        type="text"
                        value={props.form.getInput("id").data}
                        onBlur={undefined}
                        onChange={(event) => {
                            // Remove the Tooltip
                            props.appointmentNotFound &&  props.setAppointmentNotFound(false);
                            props.form.updateInputData(event.target.name, event.target.value);
                        }}
                        className="rounded-md w-full outline-none peer tracking-wider text-03"
                    />
                    <div 
                        onClick={props.loadAppointment}
                        className={clsx(
                            "ml-2 h-full aspect-square",
                            "flex items-center justify-center",
                            "rounded-md",
                            "group bg-gray-100 stroke-gray-400",
                            "transition-all cursor-pointer hover:bg-gray-300 peer-focus:bg-blue-100 hover:peer-focus:bg-blue-200 peer-focus:stroke-blue-400"
                        )}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-4 stroke-inherit cursor-pointer transition-all">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </div>
                </div>
                {!props.form.getInput("id").state[0] &&
                    <span className="text-03 text-red-500 font-medium tracking-wide">
                        {props.form.getInput("id").state[1]}
                    </span>
                }
            </div>
            <Tooltip
                isOpen={props.appointmentNotFound}
                anchorSelect="#loadInput"
                opacity={1}
                place="bottom"
                border={"1px solid #fcd34d"}
                style={{
                    backgroundColor: "#fffbeb",
                    boxShadow: "0px 2px 2px 0px #00000010",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0rem",
                    borderRadius: "6px",
                }}
            >
                <h6 className="text-02 tracking-wide text-gray-600">
                    No appointment has this information. Please try again.
                </h6>
            </Tooltip>
        </div>
    )
}