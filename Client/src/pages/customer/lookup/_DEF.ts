import { z } from "zod";
import makeForm from "@/features/Form/useForm/makeForm";

export const startForm = () => makeForm(
    {appointmentID: "", email: ""},
    z.object({appointmentID: z.string(), email: z.string()})
);