import { Makes } from "@/database/Export";
import { useEffect, useReducer, useState } from "react";
import { Text, Search } from "@/components/Input/Export";
import { FormPart } from "@/process/Employee/Update/Form/UpdateForm";
import { LoadVehicle, LoadModels, ModelYears } from "@/lib/Decoder/Decoder";
import { ErrorStructure } from "@/lib/Inspector/Inspectors";
import { inValues, isLicensePlate, isNumber, isVIN } from "@/lib/Inspector/Inspector/Inspect/Inspectors";
import FormErrorReducer, { InitialFormError } from "@/reducer/FormError/Reducer";

interface VehicleProps {
    form: {
        Make:           string;
        Model:          string;
        ModelYear:      number;
        VIN:            string;
        Mileage:        number;
        LicensePlate:   string;
    }
    updateFormError: (state: boolean) => void;
    changeHandler: (part: FormPart, name: string, value: any) => void;
}

interface LoadedValues {
    makes: Array<[string, string]>;
    models: Array<[string, string]>;
    modelYears: Array<[number, string]>;
}

const Values: LoadedValues = {
    makes: [],
    models: [],
    modelYears: []
}

export default function Vehicle(props: VehicleProps) {
    const [values, setValues] = useState<LoadedValues>(Values);
    const [formError, formErrorDispatch] = useReducer(FormErrorReducer, InitialFormError);

    useEffect(() => {
        const loadValues = async () => {
            const makes: Array<[string, string]> = (await Makes()).map(m => [m.Make, m.Make]);
            const models = await LoadModels(props.form.ModelYear, props.form.Make);
            const modelYears: Array<[number, string]> = (await ModelYears()).map(y => [y, y.toString()]);

            setValues({
                ...values,
                makes,
                models,
                modelYears
            });
        }
        loadValues();
    }, []);

    useEffect(() => {
        props.updateFormError(formError.state);
    }, [formError.state]);

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

        // No Matching Vehicle Found
        if (!vehicle.make)        
            return;

        return {
            make:       vehicle.make, 
            model:      vehicle.model, 
            modelYear:  vehicle.modelYear
        };
    }

    const changeHandler = async (name: string, value: any) => {
        if (name === 'VIN') {
            props.changeHandler('Vehicle', name, value);

            // Inspect
            const [
                vinState, 
                vinMessage
            ] = await isVIN({
                optional: true
            }).inspect(value);

            formErrorDispatch({
                name: 'VIN',
                inspection: [vinState, vinMessage]
            });

            // No Decoding for an Invalid VIN
            if (!vinState || !value)
                return;

            // Updating Form with Vehicle Info
            const vehicle = await loadVehicle(value);
            if (!vehicle)
                return;

            props.changeHandler('Vehicle', '', {
                VIN:        value,
                Make:       vehicle.make[0],
                Model:      vehicle.model[0],
                ModelYear:  vehicle.modelYear[0]
            });
        }
        else if (['Make', 'Model', 'ModelYear'].includes(name)) {
            if (name === 'Make') {
                // Clear Model Input
                // As updated models will be loaded,
                // or as an invalid make will be entered,
                // we can clear out the model.
                props.changeHandler('Vehicle', 'Model', '');

                // Update Make Input
                props.changeHandler('Vehicle', 'Make', value[0]);

                // Inspect Make
                const [makeState, makeMessage] = await inValues({
                    values: values.makes.map(m => m[0])
                }).inspect(value);

                formErrorDispatch({
                    name,
                    inspection: [makeState, makeMessage]
                });

                // Clear Loaded Models on Error
                if (!makeState) {
                    setValues({
                        ...values,
                        models: []
                    });

                    return;
                }

                loadModels(props.form.ModelYear, value[0]);
            }
            else if (name === 'ModelYear') {
                props.changeHandler('Vehicle', 'Model', '');
                props.changeHandler('Vehicle', 'ModelYear', value[0]);

                const [modelYearState, modelYearMessage] = await inValues({
                    values: values.modelYears.map(m => m[0])
                }).inspect(value);

                formErrorDispatch({
                    name,
                    inspection: [modelYearState, modelYearMessage]
                });

                if (!modelYearState) {
                    // Clear Models
                    setValues({
                        ...values,
                        models: []
                    });

                    return;
                }

                loadModels(value[0], props.form.Make);
            }
            else {
                formErrorDispatch({
                    name,
                    inspection: await inValues({
                        values: values.models.map(m => m[0])
                    }).inspect(value)
                });

                props.changeHandler('Vehicle', 'Model', value[0]);
            }
        }
        else if (name === 'Mileage') {
            props.changeHandler('Vehicle', name, value);
            formErrorDispatch({
                name,
                inspection: await isNumber().inspect(value)
            });
        }
        else if (name === 'LicensePlate') {
            props.changeHandler('Vehicle', name, value);
            formErrorDispatch({
                name,
                inspection: await isLicensePlate().inspect(value)
            });
        }
    }

    return (
        <>
            <Text
                name={"VIN"}
                value={props.form.VIN}
                error={formError.input.VIN}
                label={"VIN"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Search
                name={"ModelYear"}
                value={[props.form.ModelYear]}
                error={formError.input.ModelYear}
                values={values.modelYears}
                label={"Model Year"}
                defaultLabel="Select a Year"
                onChange={(name, value) => changeHandler(name, value)}
                size={10}
            />
            <Search
                name={"Make"}
                value={[props.form.Make]}
                error={formError.input.Make}
                values={values.makes}
                label={"Make"}
                defaultLabel="Select a Make"
                onChange={(name, value) => changeHandler(name, value)}
                size={10}
            />
            <Search
                name={"Model"}
                value={[props.form.Model]}
                error={formError.input.Model}
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
                error={formError.input.Mileage}
                label={"Mileage"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Text
                name={"LicensePlate"}
                value={props.form.LicensePlate}
                error={formError.input.LicensePlate}
                label={"License Plate"}
                onChange={(name, value) => changeHandler(name, value)}
            />
        </>
    )
}