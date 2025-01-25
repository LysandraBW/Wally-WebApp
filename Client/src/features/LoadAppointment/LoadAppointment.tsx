import TextField from "@/component/Form/Text/TextField";
import { UseForm } from "../Form/useForm/useForm";
import Button from "@/component/Form/Button/Button";

interface LoadAppointmentProps {
    form: UseForm;
    head: string;
    loadAppointment: () => void;
}

export default function LoadAppointment(props: LoadAppointmentProps) {
    return (
         <div className="flex flex-col">
            <div>
                <div className="p-4 py-8 border-b border-gray-200 mb-4 bg-gray-50">
                    <h5 className="font-medium">{props.head}</h5>
                    <span className="block text-03">Enter the ID of the appointment you want to view.</span>
                </div>
            </div>
            <form 
                onSubmit={e => e.preventDefault()}
                className="px-4 flex flex-col gap-4 max-w-[400px]">
                <TextField
                    type="text"
                    name="id"
                    label="Enter Appointment ID"
                    value={props.form.getInput("id").data}
                    state={props.form.getInput("id").state}
                    onBlur={undefined}
                    onChange={props.form.updateInputData}
                />
                <Button
                    type="submit"
                    label="Load Appointment"
                    style="boring boringBlack small"
                    onClick={props.loadAppointment}
                />
            </form>
        </div>
    )
}