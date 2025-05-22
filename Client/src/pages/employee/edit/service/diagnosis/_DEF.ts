import { z } from "zod";
import { toString } from "@/utils/convert";
import { Diagnosis as DB_AppointmentDiagnosis } from "waltronics-types";
import { Define } from "@/features/ItemManager/Define";
import { DIAGNOSIS } from "../../_DEF";
import { FormTest } from "@/features/Form/useForm/Form";

export interface Diagnosis extends Omit<DB_AppointmentDiagnosis, "DiagnosisID"> {
    DiagnosisID: string;
}

export interface Diagnoses {
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

export class DefineDiagnosis extends Define<DB_AppointmentDiagnosis, Diagnosis, Diagnoses> {
    formID = DIAGNOSIS;
    itemID = "DiagnosisID";
    itemName = "Diagnosis";

    test(..._: any[]): FormTest {
        return z.object({
            Code: z.string({message: "Must enter a code."}),
            Message: z.string({message: "Must enter a message."})
        });
    }

    buildItem(baseItem: DB_AppointmentDiagnosis | null): Diagnosis {
        return {
            Code: baseItem ? baseItem.Code : "",
            Message: baseItem? baseItem.Message : "",
            DiagnosisID: baseItem ? toString(baseItem.DiagnosisID) : ""
        }
    }

    buildItems(baseItems: DB_AppointmentDiagnosis[]): Diagnoses {
        const diagnoses: Diagnoses = {};
        for (const d of baseItems)
            diagnoses[d.DiagnosisID] = this.buildItem(d);
        return diagnoses;
    }
}