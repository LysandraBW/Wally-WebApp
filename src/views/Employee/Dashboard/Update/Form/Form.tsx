import { GeneralFormStructure } from "@/submission/Employee/Update/Form/Form/General/General";
import { PaymentFormStructure } from "@/submission/Employee/Update/Payment/Form";
import { ServiceFormStructure } from "@/submission/Employee/Update/Form/Form/Service/Service";
import { VehicleFormStructure } from "@/submission/Employee/Update/Vehicle/Form";
import { FormType } from "@/submission/Employee/Update/Form/Form";
import GeneralForm from "./GeneralForm";
import VehicleForm from "./VehicleForm";
import ServiceForm from "./ServiceForm/ServiceForm";
import PaymentForm from "./PaymentForm/PaymentForm";

interface FormProps {
    form: unknown;
    currentForm: FormType;
    updateFormState: (state: boolean) => void;
    changeHandler: (part: FormType, name: string, value: any) => void;
}

export default function Form(props: FormProps) {
    return (
        <div>
            {props.currentForm === 'General' &&
                <GeneralForm
                    form={props.form as GeneralFormStructure}
                    changeHandler={props.changeHandler}
                    updateFormState={props.updateFormState}
                />
            }
            {props.currentForm === 'Service' &&
                <ServiceForm
                    form={props.form as ServiceFormStructure}
                    changeHandler={props.changeHandler}
                    updateFormState={props.updateFormState}
                />
            }
            {props.currentForm === 'Payment' &&
                <PaymentForm
                    form={props.form as PaymentFormStructure}
                    changeHandler={props.changeHandler}
                    updateFormState={props.updateFormState}
                />
            }
            {props.currentForm === 'Vehicle' &&
                <VehicleForm
                    form={props.form as VehicleFormStructure}
                    changeHandler={props.changeHandler}
                    updateFormState={props.updateFormState}
                />
            }
        </div>
    )
}