import { z } from "zod";
import { Form } from "@/features/Form/useForm/Form";
import makeForm from "@/features/Form/useForm/makeForm";
import { subsetOf } from "@/lib/Zod/InputTest";

export const startContactForm = (): Form => makeForm(
    {fName: "", lName: "", email: "", phone: ""},
    z.object({
        fName: z.string().min(1, {message: "Must enter a first name."}),
        lName: z.string().min(1, {message: "Must enter a last name."}),
        email: z.string().min(1, {message: "Must enter an email address."}),
        phone: z.string().min(1, {message: "Must enter a phone number."})
    })
);

export const startVehicleForm = (): Form => makeForm(
    {vin: "", make: [], model: [], modelYear: "" },
    z.object({
        vin: z.string().or(z.null()).or(z.literal("")),
        make: subsetOf([]),
        model: subsetOf([]),
        modelYear: subsetOf([])
    })
);

export const startServiceForm = (): Form => makeForm(
    {services: []},
    z.object({
        services: subsetOf([])
    })
);