import { DB_Appointment } from "@/services/DB/Interface/Appointment";
import { Vehicle, VehicleUpdates } from "./_DEF";
import VehicleForm from "./VehicleForm";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
import { UseForm } from "@/features/Form/useForm/useForm";

interface VehicleManagerProps {
    parentForm: UseForm;
    appointment: DB_Appointment;
    onSaveUpdates: (updates: VehicleUpdates) => void;
}

export default function VehicleManager(props: VehicleManagerProps) {
    const processUpdates = (oldVehicle: Vehicle, newVehicle: Vehicle) => {
        const updates = {
            VIN: updatedValue(oldVehicle.VIN, newVehicle.VIN),
            Make: updatedValue(oldVehicle.Make[0], newVehicle.Make[0]),
            Model: updatedValue(oldVehicle.Model[0], newVehicle.Model[0]),
            ModelYear: updatedValue(oldVehicle.ModelYear[0], newVehicle.ModelYear[0]),
            Mileage: updatedValue(oldVehicle.Mileage, newVehicle.Mileage),
            LicensePlate: updatedValue(oldVehicle.LicensePlate, newVehicle.LicensePlate)
        } as VehicleUpdates;
        props.onSaveUpdates(updates);
    }

    return (
        <div>
            <VehicleForm
                parent={props.parentForm}
                appointment={props.appointment}
                onSaveUpdates={processUpdates}
            />
        </div>
    )
}