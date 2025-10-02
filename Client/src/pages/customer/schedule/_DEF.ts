import { z } from "zod";
import { Form } from "@/features/Form/useForm/Form";
import makeForm from "@/features/Form/useForm/makeForm";
import { strictSubsetOf } from "@/lib/Zod/InputTest";
import { isEmail, isName, isPhone, isVIN } from "@/utils/validate";

export const MAKE_ERR_MSG = "Must select a make."
export const MODEL_ERR_MSG = "Must select a model."
export const MODEL_YEAR_ERR_MSG = "Must select a model."
export const SERVICE_ERR_MSG = "Must select a service."

export const startContactForm = (): Form => makeForm(
    {fName: "", lName: "", email: "", phone: ""},
    z.object({
        fName: isName,
        lName: isName,
        email: isEmail,
        phone: isPhone
    })
);

export const startVehicleForm = (): Form => makeForm(
    {vin: "", make: [], model: [], modelYear: [] },
    z.object({
        vin: isVIN,
        make: strictSubsetOf([], MAKE_ERR_MSG),
        model: strictSubsetOf([], MODEL_ERR_MSG),
        modelYear: strictSubsetOf([], MODEL_YEAR_ERR_MSG)
    })
);

export const startServiceForm = (): Form => makeForm(
    {services: []},
    z.object({
        services: strictSubsetOf([], SERVICE_ERR_MSG)
    })
);
