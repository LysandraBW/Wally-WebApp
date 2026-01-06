import makeForm from "@/features/Form/useForm/makeForm";
import { z } from "zod";

export const CONTACT = "Contact";
export const VEHICLE = "Vehicle";
export const COST = "Cost";
export const PAYMENT = "Payment";
export const PART = "Part";
export const REPAIR = "Repair";
export const SERVICE = "Service";
export const DIAGNOSIS = "Diagnosis";
export const NOTE = "Note";

export const MasterForm = makeForm({
    [`${CONTACT}`]: [null, ""],
    [`${VEHICLE}`]: [null, ""],
    [`${COST}`]: [null, ""],
    [`${PAYMENT}`]: [null, ""],
    [`${PART}`]: [null, ""],
    [`${REPAIR}`]: [null, ""],
    [`${SERVICE}`]: [null, ""],
    [`${DIAGNOSIS}`]: [null, ""]
}, z.object({}));

export const tabs = ["General", "Vehicle", "Finances", "Diagnoses", "Parts", "Repairs", "Services", "Notes"];