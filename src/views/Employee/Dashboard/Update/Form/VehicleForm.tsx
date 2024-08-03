import { useEffect, useReducer } from "react";
import { Text, Search } from "@/components/Input/Export";
import { FormType } from "@/process/Employee/Update/Form/UpdateForm";
import { LoadModels } from "@/lib/Vehicle/Decoder";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { validLicensePlate, validNumber, validValue, validVIN } from "@/validation/Validation";
import { VehicleFormStructure } from "@/process/Employee/Update/Form/Form/Vehicle/Vehicle";
import useVehicle from "@/hook/Vehicle/Vehicle";
import { getValues, loadMakes, loadModelYears } from "@/lib/Vehicle/Load";

interface VehicleProps {
    form: VehicleFormStructure;
    updateFormState: (state: boolean) => void;
    changeHandler: (part: FormType, name: string, value: any) => void;
}

export default function Vehicle(props: VehicleProps) {
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);
    const vehicle = useVehicle();

    useEffect(() => {
        const load = async () => {
            const loadedMakes = await loadMakes();
            const loadedModels = await LoadModels(props.form.ModelYear, props.form.Make);
            const loadedModelYears = await loadModelYears();
            vehicle.setVehicleData(props.form);

            formStateDispatch({
                states: {                    
                    VIN:            await validVIN(props.form.VIN),
                    Mileage:        await validNumber(props.form.Mileage),
                    LicensePlate:   await validLicensePlate(props.form.LicensePlate),
                    Make:           await validValue([props.form.Make], loadedMakes.map(m => m[0])),
                    Model:          await validValue([props.form.Model], loadedModels.map(m => m[0])),
                    ModelYear:      await validValue([props.form.ModelYear], loadedModelYears.map(m => m[0]))
                }
            });

            vehicle.setLoadedData(loadedMakes, loadedModelYears, loadedModels);
        }
        load();
    }, []);

    useEffect(() => {
        props.updateFormState(formState.state);
    }, [formState.state]);

    const inspectInput = async <T,>(
        inputName: string, 
        input: T, 
        callback: (value: T) => Promise<[boolean, string?]>
    ): Promise<boolean> => {
        const [errState, errMessage] = await callback(input);
        formStateDispatch({
            name: inputName,
            state: [errState, errMessage]
        });
        return errState;
    }

    const changeHandler = async (name: string, value: any) => {
        switch (name) {
            case 'make':
                inspectInput(name, value, async (v) => await validValue(value, getValues(vehicle.loadedMakes)));
                vehicle.setMake(value[0]);
                break;
            case 'modelYear':
                inspectInput(name, value, async (v) => await validValue(value, getValues(vehicle.loadedModelYears)));
                vehicle.setModelYear(value[0]);
                break;
            case 'model':
                inspectInput(name, value, async (v) => await validValue(value, getValues(vehicle.loadedModels)));
                vehicle.setModel(value[0]);
                break;
            case 'vin':
                inspectInput(name, value, validVIN);
                vehicle.setVIN(value);
                break;
            case 'mileage':
                inspectInput(name, value, validNumber);
                break;
            case 'licensePlate':
                inspectInput(name, value, validLicensePlate);
                break;
        }
        props.changeHandler('Vehicle', name, value);
    }

    return (
        <>
            <Text
                name={"VIN"}
                label={"VIN"}
                value={props.form.VIN}
                error={formState.input.VIN}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Search
                name={"ModelYear"}
                label={"Model Year"}
                defaultLabel="Select a Year"
                value={[vehicle.modelYear]}
                error={formState.input.ModelYear}
                values={vehicle.loadedModelYears}
                onChange={(name, value) => changeHandler(name, value)}
                size={10}
            />
            <Search
                name={"Make"}
                label={"Make"}
                defaultLabel="Select a Make"
                value={[vehicle.make]}
                error={formState.input.Make}
                values={vehicle.loadedMakes}
                onChange={(name, value) => changeHandler(name, value)}
                size={10}
            />
            <Search
                name={"Model"}
                label={"Model"}
                defaultLabel="Select a Model"
                value={[vehicle.model]}
                error={formState.input.Model}
                values={vehicle.loadedModels}
                onChange={(name, value) => changeHandler(name, value)}
                disabled={!props.form.ModelYear || !props.form.Make}
                size={10}
            />
            <Text
                type="number"
                name={"Mileage"}
                label={"Mileage"}
                value={vehicle.mileage}
                error={formState.input.Mileage}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Text
                name={"LicensePlate"}
                label={"License Plate"}
                value={vehicle.licensePlate}
                error={formState.input.LicensePlate}
                onChange={(name, value) => changeHandler(name, value)}
            />
        </>
    )
}