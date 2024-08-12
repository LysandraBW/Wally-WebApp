import { DB_AppointmentSummary } from "@/database/Types";

export type AppointmentType = DB_AppointmentSummary | undefined | null;
// Undefined => Error
// Null => Waiting on Input