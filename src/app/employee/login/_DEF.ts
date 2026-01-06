import { z } from "zod";
import makeForm from "@/features/Form/useForm/makeForm";

export const startLoginForm = () => makeForm(
    {username: "", password: ""},
    z.object({
        username: z.string().min(1, {message: "Must enter a username."}),
        password: z.string().min(1, {message: "Must enter a password."})
    })
);