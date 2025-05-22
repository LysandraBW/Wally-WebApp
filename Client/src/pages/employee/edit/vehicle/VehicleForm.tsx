import { DB_Appointment } from "@/services/DB/Interface/Appointment";
import { useEffect, useState } from "react";
import { makeVehicle, vehicleTest, Vehicle } from "./_DEF";
import { VEHICLE } from "../_DEF";
import { fetchModels } from "@/services/NHTSA/fetchModels";
import VehicleMakePairs from "@/services/DB/Information/SelectVehicleMakePairs";
import { loadModelYears } from "@/services/NHTSA/loadModelYears";
import { fetchVehicle } from "@/services/NHTSA/fetchVehicle";
import { subsetOf } from "@/lib/Zod/InputTest";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import { Options } from "@/features/Form/DEF";
import getValues from "@/features/Form/helpers/getValues";
import makeForm from "@/features/Form/useForm/makeForm";
import TextField from "@/component/Form/Text/TextField";
import Search from "@/component/Form/Select/Search/Search";
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";

interface VehicleFormProps {
    parent: UseForm;
    appointment: DB_Appointment;
    onSaveUpdates: (oldVehicle: Vehicle, newVehicle: Vehicle) => void;
}

export default function VehicleForm(props: VehicleFormProps) {
    const form = useForm(VEHICLE);
    const [oldVehicle, setOldVehicle] = useState<Vehicle>();

    const [makes, setMakes] = useState<Options>([]);
    const [models, setModels] = useState<Options>([]);
    const [modelYears, setModelYears] = useState<Options>([]);

    useEffect(() => {
        resetForm();
    }, []);

    const saveForm = () => {
        const state = form.getState();
        props.parent.setInputState(VEHICLE, [state, ""]);
        if (!state || !oldVehicle)
            return;
        const newVehicle: Vehicle = form.getData() as Vehicle;
        props.onSaveUpdates(oldVehicle, newVehicle);
    }

    const resetForm = async () => {
        const vehicle = makeVehicle(props.appointment);
        setOldVehicle(vehicle);

        const vehicleMakes = 
            makes.length > 0 ? 
            makes : 
            await VehicleMakePairs();
        setMakes(vehicleMakes);

        const vehicleModels = await fetchModels(
            vehicle.ModelYear[0], 
            vehicle.Make[0]
        );
        setModels(vehicleModels);

        const vehicleModelYears = 
            modelYears.length > 0 ? 
            modelYears : 
            loadModelYears();
        setModelYears(vehicleModelYears);
        
        const test = vehicleTest(
            getValues(vehicleMakes), 
            getValues(vehicleModels), 
            getValues(vehicleModelYears)
        );        
        form.resetForm(makeForm(vehicle, test));
    }

    const updateVehicle = async (VIN: string) => {
        const vehicle = await fetchVehicle(VIN, makes);
        if (!vehicle.decoded)
            return;
        setModels(vehicle.models);
        form.setInputTest("Model", subsetOf(getValues(vehicle.models)));
        form.updateInputData("Make", vehicle.make);
        form.updateInputData("Model", vehicle.model);
        form.updateInputData("ModelYear", vehicle.modelYear);
    }

    const updateVehicleModels = async (modelYear: string, make: string) => {
        const models = await fetchModels(modelYear, make);
        setModels(models);
        form.setInputData("Model", []);
        form.setInputTest("Model", subsetOf(getValues(models)));
    }

    const updateValue = async (name: string, value: any) => {
        switch (name) {
            case "VIN":
                updateVehicle(value);
                break;
            case "Make":
                const _make = value[0];
                const modelYear = form.getInput("ModelYear").data[0];
                updateVehicleModels(modelYear, _make);
                break;
            case "ModelYear":
                const _modelYear = value[0];
                const make = form.getInput("Make").data[0];
                updateVehicleModels(_modelYear, make);
                break;
        }
        form.updateInputData(name, value);
        props.parent.setInputState(VEHICLE, [form.getState(), ""]);
    }
    
    return (
        <div className="flex flex-col gap-1 relative">
            <div className="flex flex-col px-6 py-6 gap-6 max-w-[500px]">
                <TextField
                    name="VIN"
                    type="text"
                    label="VIN"
                    value={form.getInput("VIN").data || ""}
                    state={form.getInput("VIN").state}
                    onChange={updateValue}
                    onBlur={undefined}
                />
                <Search
                    name="ModelYear"
                    label="Model Year"
                    toggleLabel="Select Model Year"
                    values={form.getInput("ModelYear").data || []}
                    state={form.getInput("ModelYear").state}
                    options={modelYears}
                    onChange={updateValue}
                    disabled={false}
                />
                <Search
                    name="Make"
                    label="Make"
                    toggleLabel="Select Make"
                    values={form.getInput("Make").data || []}
                    state={form.getInput("Make").state}
                    options={makes}
                    onChange={updateValue}
                    disabled={false}
                />
                <Search
                    name="Model"
                    label="Model"
                    toggleLabel="Select Model"
                    values={form.getInput("Model").data || []}
                    state={form.getInput("Model").state}
                    options={models}
                    onChange={updateValue}
                    disabled={false}
                />
                <TextField
                    name="Mileage"
                    type="text"
                    label="Mileage"
                    value={form.getInput("Mileage").data || ""}
                    state={form.getInput("Mileage").state}
                    onChange={updateValue}
                    onBlur={undefined}
                />
                <TextField
                    name="LicensePlate"
                    type="text"
                    label="License Plate"
                    value={form.getInput("LicensePlate").data || ""}
                    state={form.getInput("LicensePlate").state}
                    onChange={updateValue}
                    onBlur={undefined}
                />
            </div>
            <SaveResetButtons
                onSave={saveForm}
                onReset={resetForm}
            />
        </div>
    )
}