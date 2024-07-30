import { getSessionID } from "@/lib/Cookies/Cookies";
import { ProcessedVehicleFormStructure, processVehicleForm } from "./Process";
import { VehicleFormStructure } from "./Vehicle";
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