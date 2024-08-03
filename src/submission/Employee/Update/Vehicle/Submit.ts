import { getSessionID } from "@/lib/Storage/Storage";
import { ProcessedVehicleFormStructure, processVehicleForm } from "./Process";
import { VehicleFormStructure } from "./Form";
import { UpdateVehicle } from "@/database/Export";

export async function submitVehicleForm(reference: VehicleFormStructure, current: VehicleFormStructure): Promise<boolean> {
    const SessionID = await getSessionID();
    const processedForm: ProcessedVehicleFormStructure = await processVehicleForm(reference, current);

    const output = await UpdateVehicle({
        SessionID,
        ...processedForm
    });

    if (!output)
        throw 'Update Vehicle Error';

    return true;
}