import GeneralForm from "@/views/Employee/Dashboard/Update/GeneralForm";
import ServiceForm from "@/views/Employee/Dashboard/Update/Form/ServiceForm/ServiceForm";
import PaymentForm from "@/views/Employee/Dashboard/Update/Form/PaymentForm/PaymentForm";
import VehicleForm from "@/views/Employee/Dashboard/Update/VehicleForm";
import { GeneralFormStructure } from "@/process/Employee/Update/Form/Form/General/General";
import { PaymentFormStructure } from "@/process/Employee/Update/Form/Form/Payment/Payment";
import { ServiceFormStructure } from "@/process/Employee/Update/Form/Form/Service/Service";
import { VehicleFormStructure } from "@/process/Employee/Update/Form/Form/Vehicle/Vehicle";
import { FormType } from "@/process/Employee/Update/Form/UpdateForm";

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