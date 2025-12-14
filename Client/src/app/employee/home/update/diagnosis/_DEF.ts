import { z } from "zod";
import { toString } from "@/utils/convert";
import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
// import { Define } from "./Define";
import { FormTest } from "@/features/Form/useForm/Form";
import { Define } from "../Define";
import { DIAGNOSIS } from "../_DEF";

export interface Diagnosis extends Omit<DB_AppointmentDiagnosis, "DiagnosisID"> {
    DiagnosisID: string;
}

export interface MappedDiagnoses {
    [diagnosisID: string]: Diagnosis;
}

export interface DiagnosisUpdates {
    Update: Array<{
        DiagnosisID: number;
        Code: string | null;
        Message: string | null;
    }>;
    Insert: Array<{
        Code: string;
        Message: string;
    }>;
    Delete: Array<{
        DiagnosisID: number;
    }>;
}

export class DefineDiagnosis extends Define<DB_AppointmentDiagnosis, Diagnosis, MappedDiagnoses> {
    key = DIAGNOSIS;
    thingName = "Diagnosis";
    thingIDName = "DiagnosisID";

    test(..._: any[]): FormTest {
        return z.object({
            Code: z.string({message: "Must enter a code."}),
            Message: z.string({message: "Must enter a message."})
        });
    }

    processThing(baseThing: DB_AppointmentDiagnosis | null): Diagnosis {
        return {
            Code: baseThing ? baseThing.Code : "",
            Message: baseThing? baseThing.Message : "",
            DiagnosisID: baseThing ? toString(baseThing.DiagnosisID) : ""
        }
    }

    processThings(baseThings: DB_AppointmentDiagnosis[]): MappedDiagnoses {
        const diagnoses: MappedDiagnoses = {};
        for (const d of baseThings)
            diagnoses[d.DiagnosisID] = this.processThing(d);
        return diagnoses;
    }
}