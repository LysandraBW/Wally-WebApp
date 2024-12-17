import { getSessionID } from "@/utils/cookie";
import { processVehicleForm } from "./Process";
import { VehicleFormStructure } from "./Form";
import { UpdateVehicle } from "@/db/export";

export async function submitVehicleForm(reference: VehicleFormStructure, current: VehicleFormStructure): Promise<boolean> {
    console.log(reference, current);
    const SessionID = await getSessionID();
    
    const processedForm = await processVehicleForm(reference, current);

    const output = await UpdateVehicle({
        SessionID,
        ...processedForm
    });

    if (!output)
        throw 'Update Vehicle Error';

    return true;
}