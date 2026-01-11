import { z } from "zod";
import makeForm from "@/features/Form/useForm/makeForm";
import { isEmail, isUUID } from "waltronics-types";

export const startForm = () => makeForm(
    {appointmentID: "", email: ""},
    z.object({appointmentID: isUUID, email: isEmail})
);