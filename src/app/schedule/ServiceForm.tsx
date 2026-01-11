import getValues from "@/features/Form/helpers/getValues";
import { Options } from "@/features/Form/DEF";
import { UseForm } from "@/features/Form/useForm/useForm";
import { strictSubsetOf } from "@/utils/validate";
import { GetT1Services } from "@/services/db/Information/GetT1Services";
import { Fragment, useEffect, useState } from "react";
import SearchServices from "./SearchServices";
import { SERVICE_ERR_MSG } from "./_DEF";

interface ServiceFormProps {
    form: UseForm;
}

export default function ServiceForm(props: ServiceFormProps) {
    const [services, setServices] = useState<{[serviceClass: string]: Options}>({});

    useEffect(() => {
        const initialize = async () => {
            const services: {[name: string]: Options} = {
                ...await GetT1Services(), 
                "Other": [["0", "I Don't Know"]]
            };
            setServices(services);

            const serviceValues = getValues(Object.values(services).flat())
            props.form.setInputTest("services", strictSubsetOf(serviceValues, SERVICE_ERR_MSG));
        }
        initialize();
    }, []);
    
    return (
        <Fragment>
            {services &&
                <SearchServices
                    name="services"
                    state={props.form.getInput("services").state}
                    values={props.form.getInput("services").data}
                    options={services}
                    onChange={props.form.updateInputData}
                />
            }
        </Fragment>
    )
}