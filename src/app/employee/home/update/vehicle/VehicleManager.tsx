import { Appointment as DB_Appointment } from "waltronics-types";
import { updatedValue } from "@/features/ItemManager/helpers/updatedValue";
import useForm, { UseForm } from "@/features/Form/useForm/useForm";
import { VEHICLE } from "@/app/employee/home/update/_DEF";
import { Fragment, useEffect, useState } from "react";
import { Options } from "@/features/Form/DEF";
import { makeVehicle, Vehicle, vehicleTest, VehicleUpdates } from "@/app/employee/home/update/vehicle/_DEF";
import VehicleMakePairs from "@/services/db/Information/SelectVehicleMakePairs";
import { fetchModels } from "@/services/vehicle/fetchModels";
import { fetchModelYears } from "@/services/vehicle/fetchModelYears";
import getValues from "@/features/Form/helpers/getValues";
import makeForm from "@/features/Form/useForm/makeForm";
import { fetchVehicle } from "@/services/vehicle/fetchVehicle";
import { subsetOf } from "@/utils/validate";
import EntrySearchField from "@/shared/appointment/Entry/EntrySearchField";
import SaveResetButtons from "@/features/ItemManager/components/SaveResetButtons";
import EntryTextField from "../../../../../shared/appointment/Entry/EntryTextField";
import resizeMainContent from "@/shared/appointment/resizeMainContent";
import EntryWrapper from "@/shared/appointment/Entry/EntryWrapper";


interface VehicleManagerProps {
    updateManagerForm: UseForm;
    appointment: DB_Appointment;
    onSaveUpdates: (updates: VehicleUpdates) => void;
    setChangesMade?: (keyForUpdateManager: string, changesMade: boolean) => void;
}


export default function VehicleManager(props: VehicleManagerProps) {
    const form = useForm(VEHICLE);
    const [oldVehicle, setOldVehicle] = useState<Vehicle>();
    const [makes, setMakes] = useState<Options>([]);
    const [models, setModels] = useState<Options>([]);
    const [modelYears, setModelYears] = useState<Options>([]);
    const [changesMade, setChangesMade] = useState(false);
    

    useEffect(() => {
        resetUpdates();
    }, []);


    useEffect(() => {
        props.setChangesMade && props.setChangesMade(VEHICLE, changesMade);
    }, [changesMade]);

    
    useEffect(() => {
        resizeMainContent();
        window.addEventListener("resize", resizeMainContent);
    }, []);


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


    const saveUpdates = () => {
        const state = form.getState();
        props.updateManagerForm.setInputState(VEHICLE, [state, ""]);

        if (!state || !oldVehicle)
            return;

        const newVehicle: Vehicle = form.getData() as Vehicle;
        processUpdates(oldVehicle, newVehicle);
        setChangesMade(false);
    }

    
    const resetUpdates = async () => {
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
            fetchModelYears();
        setModelYears(vehicleModelYears);
        
        const test = vehicleTest(
            getValues(vehicleMakes), 
            getValues(vehicleModels), 
            getValues(vehicleModelYears)
        );        
        form.resetForm(makeForm(vehicle, test));
        setChangesMade(false);
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
        props.updateManagerForm.setInputState(VEHICLE, [form.getState(), ""]);
        setChangesMade(JSON.stringify(form.getData()) !== JSON.stringify(oldVehicle));
    }


    return (
        <EntryWrapper
            entries={
                <Fragment>
                    <EntryTextField
                        name="VIN"
                        type="text"
                        label="VIN"
                        value={form.getInput("VIN").data || ""}
                        state={form.getInput("VIN").state}
                        onChange={updateValue}
                        onBlur={undefined}
                    />
                    <EntrySearchField
                        name="ModelYear"
                        label="Model Year"
                        toggleLabel="Select Model Year"
                        values={form.getInput("ModelYear").data || []}
                        state={form.getInput("ModelYear").state}
                        options={modelYears}
                        onChange={updateValue}
                        disabled={false}
                    />
                    <EntrySearchField
                        name="Make"
                        label="Make"
                        toggleLabel="Select Make"
                        values={form.getInput("Make").data || []}
                        state={form.getInput("Make").state}
                        options={makes}
                        onChange={updateValue}
                        disabled={false}
                    />
                    <EntrySearchField
                        name="Model"
                        label="Model"
                        toggleLabel="Select Model"
                        values={form.getInput("Model").data || []}
                        state={form.getInput("Model").state}
                        options={models}
                        onChange={updateValue}
                        disabled={false}
                    />
                    <EntryTextField
                        name="Mileage"
                        type="text"
                        label="Mileage"
                        value={form.getInput("Mileage").data || ""}
                        state={form.getInput("Mileage").state}
                        onChange={updateValue}
                        onBlur={undefined}
                    />
                    <EntryTextField
                        name="LicensePlate"
                        type="text"
                        label="License Plate"
                        value={form.getInput("LicensePlate").data || ""}
                        state={form.getInput("LicensePlate").state}
                        onChange={updateValue}
                        onBlur={undefined}
                    />
                </Fragment>
            }
            saveResetButtons={
                <SaveResetButtons
                    onSave={saveUpdates}
                    onReset={resetUpdates}
                    changesMade={changesMade}
                />
            }
        />
    )
}