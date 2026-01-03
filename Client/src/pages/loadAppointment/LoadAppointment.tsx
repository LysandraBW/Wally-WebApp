import clsx from "clsx";
import { UseForm } from "../../features/Form/useForm/useForm";
import { Tooltip } from "react-tooltip";
import ArrowRight from "@/component/Icons/Icons/ArrowRightIcon";
import ArrowLongRightIcon from "@/component/Icons/Icons/ArrowLongRightIcon";
import SearchIcon from "@/component/Icons/Icons/SearchIcon";

interface LoadAppointmentProps {
    form: UseForm;
    head: string;
    body: string;
    loadAppointment: () => void;
    appointmentNotFound: boolean;
    setAppointmentNotFound: (b: boolean) => void;
}

export default function LoadAppointment(props: LoadAppointmentProps) {
    return (
         <div className="flex flex-col gap-4 grow items-center justify-center">
            <div>
                <p className="text-base text-center text-base-900 font-medium whitespace-nowrap">
                    {props.head}
                </p>
                <span className="block text-sm text-center tracking-wide text-base-500 font-normal">
                    {props.body}
                </span>
            </div>
            <div>
                <div 
                    id="loadInput"
                    className={clsx(
                        "w-[350px] flex gap-1 h-[32px]",
                        "surface-background surface-border shadow-sm rounded-md",
                        "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 dark:focus-within:!ring-blue-700/10 focus-within:border-blue-500 dark:focus-within:shadow-blue-500/25"
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
                        className="rounded-[5px] surface-background w-full pl-2 outline-none peer text-sm text-base-700 tracking-wider"
                    />
                    <div 
                        onClick={props.loadAppointment}
                        className={clsx(
                            "ml-2 h-full aspect-square",
                            "flex items-center justify-center",
                            "bg-base-50 border-l border-l-base-300 dark:border-base-200 rounded-r-[5px]",
                            "group stroke-base-500",
                            "cursor-pointer hover:bg-base-100 dark:hover:bg-base-50 peer-focus:bg-blue-500- "
                        )}
                    >
                        <ArrowLongRightIcon
                            className="size-4 stroke-[2px] stroke-inherit cursor-pointer rotate-[360deg]"
                        />
                    </div>
                </div>
                {!props.form.getInput("id").state[0] &&
                    <span className="text-sm text-red-500 tracking-wide">
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