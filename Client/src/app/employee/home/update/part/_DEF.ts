import { Define } from "../Define";
import { Part as DB_AppointmentPart } from "waltronics-types";
import { toString } from "@/utils/convert";
import { z } from "zod";
import { PART } from "../_DEF";
import { FormTest } from "@/features/Form/useForm/Form";

export interface Part extends Pick<DB_AppointmentPart, "PartName" | "PartNumber"> {
    PartID: string;
    Quantity: string;
    UnitCost: string;
};

export interface MappedParts {[partID: string]: Part};

export interface PartUpdates {
    Update: Array<{
        PartID: number;
        PartName: string | null;
        PartNumber: string | null;
        Quantity: number | null;
        UnitCost: number | null;
    }>;
    Insert: Array<{
        PartName: string;
        PartNumber: string;
        Quantity: number;
        UnitCost: number;
    }>;
    Delete: Array<{
        PartID: number;
    }>;
}

export class DefinePart extends Define<DB_AppointmentPart, Part, MappedParts> {
    key = PART;
    itemName = "Part";
    itemIDName = "PartID";

    test(..._: any[]): FormTest {
        return z.object({
            PartName: z.string(),
            PartNumber: z.string(),
            Quantity: z.string(),
            UnitCost: z.string()
        });
    }

    processThing(baseItem: DB_AppointmentPart | null): Part {
        return {
            PartID: toString(baseItem?.PartID),
            PartName: baseItem?.PartName || "",
            PartNumber: baseItem?.PartNumber || "",
            Quantity: toString(baseItem?.Quantity),
            UnitCost: toString(baseItem?.UnitCost)
        }
    }

    processThings(baseItems: DB_AppointmentPart[]): MappedParts {
        const parts: MappedParts = {};
        for (const p of baseItems)
            parts[p.PartID] = this.processThing(p);
        return parts;
    }
}