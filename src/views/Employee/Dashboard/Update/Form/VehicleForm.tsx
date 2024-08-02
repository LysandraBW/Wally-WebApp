import { Makes } from "@/database/Export";
import { useEffect, useReducer, useState } from "react";
import { Text, Search } from "@/components/Input/Export";
import { FormPart } from "@/process/Employee/Update/Form/UpdateForm";
import { LoadVehicle, LoadModels, ModelYears } from "@/lib/Vehicle/Decoder";
import FormStateReducer, { InitialFormState } from "@/hook/FormState/Reducer";
import { LoadedValues, Values } from "@/process/Employee/Update/Structure/Vehicle";
import { validLicensePlate, validMake, validModel, validModelYear, validNumber, validVIN } from "@/validation/Validation";

interface VehicleProps {
    form: {
        Make:           string;
        Model:          string;
        ModelYear:      number;
        VIN:            string;
        Mileage:        number;
        LicensePlate:   string;
    }
    updateFormState: (state: boolean) => void;
    changeHandler: (part: FormPart, name: string, value: any) => void;
}

export default function Vehicle(props: VehicleProps) {
    const [values, setValues] = useState<LoadedValues>(Values);
    const [formState, formStateDispatch] = useReducer(FormStateReducer, InitialFormState);

    useEffect(() => {
        const load = async () => {
            const makes: Array<[string, string]> = (await Makes()).map(m => [m.Make, m.Make]);
            const models = await LoadModels(props.form.ModelYear, props.form.Make);
            const modelYears: Array<[number, string]> = (await ModelYears()).map(y => [y, y.toString()]);

            // Initializing Form State
            setValues({...values, makes, models, modelYears});
            formStateDispatch({
                states: {
                    Make: await validMake([props.form.Make], values.makes.map(m => m[0])),
                    Model: await validModel([props.form.Model], values.models.map(m => m[0])),
                    ModelYear: await validModelYear([props.form.ModelYear], values.modelYears.map(m => m[0])),
                    VIN: await validVIN(props.form.VIN),
                    Mileage: await validNumber(props.form.Mileage),
                    LicensePlate: await validLicensePlate(props.form.LicensePlate),
                }
            })
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

    const loadModels = async (modelYear: number, make: string) => {
        const models = await LoadModels(modelYear, make);
        setValues({...values, models});
    }

    const loadVehicle = async (vin: string) => {
        if (!vin)
            return;

        const vehicle  = await LoadVehicle(vin, values.makes);
        setValues({
            ...values, 
            models: vehicle.models
        });

        if (!vehicle.decoded)        
            return;
        return {...vehicle};
    }

    const changeHandler = async (name: string, value: any) => {
        if (name === 'VIN') {
            props.changeHandler('Vehicle', name, value);

            const vinState = await inspectInput('VIN', value, validVIN);

            // No Decoding for an Invalid VIN
            if (!vinState || !value)
                return;

            // Updating Form with Vehicle Info
            const vehicle = await loadVehicle(value);
            if (!vehicle)
                return;

            props.changeHandler('Vehicle', '', {
                VIN: value,
                Make: vehicle.make[0],
                Model: vehicle.model[0],
                ModelYear: vehicle.modelYear[0]
            });
        }
        else if (['Make', 'Model', 'ModelYear'].includes(name)) {
            if (name === 'Make') {
                props.changeHandler('Vehicle', 'Model', '');
                props.changeHandler('Vehicle', 'Make', value[0]);

                const makeState = await inspectInput('Make', value, v => validMake(v, values.makes.map(m => m[0])));
                if (!makeState)
                    setValues({...values, models: []});
                else
                    loadModels(props.form.ModelYear, value[0]);
            }
            else if (name === 'ModelYear') {
                props.changeHandler('Vehicle', 'Model', '');
                props.changeHandler('Vehicle', 'ModelYear', value[0]);

                const modelYearState = await inspectInput('ModelYear', value, v => validModelYear(v, values.modelYears.map(m => m[0])));
                if (!modelYearState)
                    setValues({...values, models: []});
                else
                    loadModels(value[0], props.form.Make);
            }
            else {
                props.changeHandler('Vehicle', 'Model', value[0]);
                await inspectInput('Model', value, v => validModel(v, values.models.map(m => m[0])));
            }
        }
        else if (name === 'Mileage') {
            props.changeHandler('Vehicle', name, value);
            await inspectInput('Mileage', value, validNumber);
        }
        else if (name === 'LicensePlate') {
            props.changeHandler('Vehicle', name, value);
            await inspectInput('LicensePlate', value, validLicensePlate);
        }
    }

    return (
        <>
            <Text
                name={"VIN"}
                value={props.form.VIN}
                error={formState.input.VIN}
                label={"VIN"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Search
                name={"ModelYear"}
                value={[props.form.ModelYear]}
                error={formState.input.ModelYear}
                values={values.modelYears}
                label={"Model Year"}
                defaultLabel="Select a Year"
                onChange={(name, value) => changeHandler(name, value)}
                size={10}
            />
            <Search
                name={"Make"}
                value={[props.form.Make]}
                error={formState.input.Make}
                values={values.makes}
                label={"Make"}
                defaultLabel="Select a Make"
                onChange={(name, value) => changeHandler(name, value)}
                size={10}
            />
            <Search
                name={"Model"}
                value={[props.form.Model]}
                error={formState.input.Model}
                values={values.models}
                label={"Model"}
                defaultLabel="Select a Model"
                onChange={(name, value) => changeHandler(name, value)}
                disabled={!props.form.ModelYear || !props.form.Make}
                size={10}
            />
            <Text
                type="number"
                name={"Mileage"}
                value={props.form.Mileage}
                error={formState.input.Mileage}
                label={"Mileage"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Text
                name={"LicensePlate"}
                value={props.form.LicensePlate}
                error={formState.input.LicensePlate}
                label={"License Plate"}
                onChange={(name, value) => changeHandler(name, value)}
            />
        </>
    )
}