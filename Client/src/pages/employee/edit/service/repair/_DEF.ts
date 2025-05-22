import { Define } from "@/features/ItemManager/Define";
import { Repair as DB_AppointmentRepair } from "waltronics-types";
import { toString } from "@/utils/convert";
import { z } from "zod";
import { REPAIR } from "../../_DEF";
import { FormTest } from "@/features/Form/useForm/Form";

export interface Repair extends Omit<DB_AppointmentRepair, "RepairID"> {
    RepairID: string;
}

export interface Repairs {
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

export class DefineRepair extends Define<DB_AppointmentRepair, Repair, Repairs> {
    formID = REPAIR;
    itemID = "RepairID";
    itemName = "Repair";

    test(..._: any[]): FormTest {
        return z.object({
            Repair: z.string()
        });
    }

    buildItem(baseItem: DB_AppointmentRepair | null): Repair {
        return {
            RepairID: toString(baseItem?.RepairID),
            Repair: baseItem?.Repair || ""
        }
    }

    buildItems(baseItems: DB_AppointmentRepair[]): Repairs {
        const repairs: Repairs = {};
        for (const repair of baseItems)
            repairs[repair.RepairID] = this.buildItem(repair);
        return repairs;
    }
}