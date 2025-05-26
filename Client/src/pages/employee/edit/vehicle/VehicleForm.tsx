import { Appointment as DB_Appointment } from "waltronics-types";
import { Fragment, useContext, useEffect, useState } from "react";
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
import SaveResetButtons from "@/features/ItemManager/Form/SaveResetButtons";
import TextFieldGrid from "../TextFieldGrid";
import SearchGrid from "../SearchGrid";
import { UpdateManagerContext } from "../Update";

interface VehicleFormProps {
    parent: UseForm;
    appointment: DB_Appointment;
    onSaveUpdates: (oldVehicle: Vehicle, newVehicle: Vehicle) => void;
    tabOpen: boolean;
}

export default function VehicleForm(props: VehicleFormProps) {
    const form = useForm(VEHICLE);
    const [oldVehicle, setOldVehicle] = useState<Vehicle>();

    const [makes, setMakes] = useState<Options>([]);
    const [models, setModels] = useState<Options>([]);
    const [modelYears, setModelYears] = useState<Options>([]);
    const updateManagerContext = useContext(UpdateManagerContext);

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
        updateManagerContext.setChangesMade("Vehicle", false);
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
        updateManagerContext.setChangesMade("Vehicle", false);
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
        updateManagerContext.setChangesMade("Vehicle", JSON.stringify(form.getData()) !== JSON.stringify(oldVehicle));
    }
    
    return (
        <Fragment>
            {props.tabOpen &&
                <div className="row-start-5 row-span-1 col-start-1 col-span-1 grow relative flex flex-col h-min">
                    <div className="bg-white relative after:absolute after:w-[1px] after:h-full after:top-0 after:left-[0px] after:bg-gray-300 before:absolute before:w-[1px] before:h-full after:top-0 before:right-[0px] before:bg-gray-300 h-full grow">
                        <table className="grow w-full border-collapse">
                            <tbody>
                                <TextFieldGrid
                                    name="VIN"
                                    type="text"
                                    label="VIN"
                                    value={form.getInput("VIN").data || ""}
                                    state={form.getInput("VIN").state}
                                    onChange={updateValue}
                                    onBlur={undefined}
                                />
                                <SearchGrid
                                    name="ModelYear"
                                    label="Model Year"
                                    toggleLabel="Select Model Year"
                                    values={form.getInput("ModelYear").data || []}
                                    state={form.getInput("ModelYear").state}
                                    options={modelYears}
                                    onChange={updateValue}
                                    disabled={false}
                                />
                                <SearchGrid
                                    name="Make"
                                    label="Make"
                                    toggleLabel="Select Make"
                                    values={form.getInput("Make").data || []}
                                    state={form.getInput("Make").state}
                                    options={makes}
                                    onChange={updateValue}
                                    disabled={false}
                                />
                                <SearchGrid
                                    name="Model"
                                    label="Model"
                                    toggleLabel="Select Model"
                                    values={form.getInput("Model").data || []}
                                    state={form.getInput("Model").state}
                                    options={models}
                                    onChange={updateValue}
                                    disabled={false}
                                />
                                <TextFieldGrid
                                    name="Mileage"
                                    type="text"
                                    label="Mileage"
                                    value={form.getInput("Mileage").data || ""}
                                    state={form.getInput("Mileage").state}
                                    onChange={updateValue}
                                    onBlur={undefined}
                                />
                                <TextFieldGrid
                                    name="LicensePlate"
                                    type="text"
                                    label="License Plate"
                                    value={form.getInput("LicensePlate").data || ""}
                                    state={form.getInput("LicensePlate").state}
                                    onChange={updateValue}
                                    onBlur={undefined}
                                />
                            </tbody>
                        </table>
                    </div>
                    <SaveResetButtons
                        onSave={saveForm}
                        onReset={resetForm}
                    />
                </div>
            }
        </Fragment>
    )
}