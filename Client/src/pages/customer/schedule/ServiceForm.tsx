import getValues from "@/features/Form/helpers/getValues";
import { Options } from "@/features/Form/DEF";
import { UseForm } from "@/features/Form/useForm/useForm";
import { subsetOf } from "@/lib/Zod/InputTest";
import { GetT1Services } from "@/services/DB/Information/GetT1Services";
import { Fragment, useEffect, useState } from "react";
import SearchServices from "./SearchServices";
import SearchServicesSimple from "./SearchServicesSimple";

interface ServiceFormProps {
    form: UseForm;
}

export default function ServiceForm(props: ServiceFormProps) {
    const [services, setServices] = useState<{[serviceClass: string]: Options}>({});

    useEffect(() => {
        const initialize = async () => {
            const services: {[name: string]: Options} = {...await GetT1Services(), "Other": [["0", "I Don't Know"]]};
            setServices(services);
            props.form.setInputTest("services", subsetOf(getValues(Object.values(services).flat())));
        }
        initialize();
    }, []);
    
    return (
        <Fragment>
            {services &&
                <SearchServicesSimple
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