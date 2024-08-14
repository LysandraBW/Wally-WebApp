import GeneralForm from "./GeneralForm";
import VehicleForm from "./VehicleForm";
import ServiceManager from "./ServiceForm/ServiceForm";
import PaymentManager from "./PaymentForm/PaymentManager";
import { DB_Appointment } from "@/database/Types";

interface FormProps {
    currentForm: string;
    appointment: DB_Appointment;
}

export default function Form(props: FormProps) {
    return (
        <div>
            {props.currentForm === 'General' &&
                <GeneralForm
                    appointment={props.appointment}
                />
            }
            {props.currentForm === 'Service' &&
                <ServiceManager
                    appointment={props.appointment}
                />
            }
            {props.currentForm === 'Payment' &&
                <PaymentManager
                    appointment={props.appointment}
                />
            }
            {props.currentForm === 'Vehicle' &&
                <VehicleForm
                    appointment={props.appointment}
                />
            }
        </div>
    )
}