import { Define } from "../Define";
import { Repair as DB_AppointmentRepair } from "waltronics-types";
import { toString } from "@/utils/convert";
import { z } from "zod";
import { REPAIR } from "../_DEF";
import { FormTest } from "@/features/Form/useForm/Form";

export interface Repair extends Omit<DB_AppointmentRepair, "RepairID"> {
    RepairID: string;
}

export interface MappedRepairs {
    [repairID: string]: Repair;
}

export interface RepairUpdates {
    Update: Array<{
        RepairID: number;
        Repair: string | null;
    }>;
    Insert: Array<{
        Repair: string;
    }>;
    Delete: Array<{
        RepairID: number;
    }>;
}

export class DefineRepair extends Define<DB_AppointmentRepair, Repair, MappedRepairs> {
    key = REPAIR;
    thingIDName = "RepairID";
    thingName = "Repair";

    test(..._: any[]): FormTest {
        return z.object({
            Repair: z.string()
        });
    }

    processThing(baseThing: DB_AppointmentRepair | null): Repair {
        return {
            RepairID: toString(baseThing?.RepairID),
            Repair: baseThing?.Repair || ""
        }
    }

    processThings(baseThings: DB_AppointmentRepair[]): MappedRepairs {
        const mappedrepairs: MappedRepairs = {};
        for (const repair of baseThings)
            mappedrepairs[repair.RepairID] = this.processThing(repair);
        return mappedrepairs;
    }
}