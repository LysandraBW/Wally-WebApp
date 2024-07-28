import { Makes } from "@/lib/Database/Export";
import { LoadMakeModelModelYear, LoadModels, ModelYears } from "@/lib/Decoder/Decoder";
import { useEffect, useState } from "react";
import { Text, Search } from "@/components/Input/Export";
import { Parts } from "@/process/Employee/Update/Form";

interface VehicleProps {
    form: {
        Make: string;
        Model: string;
        ModelYear: number;
        VIN: string;
        Mileage: number;
        LicensePlate: string;
    }
    changeHandler: (part: Parts, name: string, value: any, agg?: boolean) => void;
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

    useEffect(() => {
        const loadValues = async () => {
            // I have to specify the type for the compiler not to throw an error.
            const modelYears: Array<[number, string]> = (await ModelYears()).map(y => [y, y.toString()]);
            const makes: Array<[string, string]> = (await Makes()).map(m => [m.Make, m.Make]);
            const models = await LoadModels(props.form.ModelYear, props.form.Make);

            setValues({
                ...values,
                makes,
                models,
                modelYears
            });
        }
        loadValues();
    }, []);

    
    const loadModels = async (modelYear: number, make: string) => {
        const models = await LoadModels(modelYear, make);
        setValues({...values, models});
    }

    const loadMakeModelModelYear = async (vin: string) => {
        if (!vin)
            return;

        const {make, model, models, modelYear} = await LoadMakeModelModelYear(vin, values.makes);
        if (!make)        
            return;

        setValues({...values, models});
        return {
            make: make, 
            model: model, 
            modelYear: modelYear
        }
    }

    const changeHandler = async (name: string, value: any) => {
        const part: Parts = 'Vehicle';
        if (name === 'VIN') {
            props.changeHandler(part, name, value);
            if (value.length < 17)
                return;

            const data = await loadMakeModelModelYear(value);
            if (!data)
                return;

            props.changeHandler(part, '', {
                VIN: value,
                Make: data.make[0],
                Model: data.model[0],
                ModelYear: data.modelYear[0]
            }, true);
        }
        else if (name === 'Make' || name === 'ModelYear' || name === 'Model') {
            if (name === 'Make') {
                loadModels(props.form.ModelYear, value[0]);
                props.changeHandler(part, 'Model', '');
            }
            else if (name === 'ModelYear') {
                loadModels(value[0], props.form.Make);
                props.changeHandler(part, 'Model', '');
            }
            props.changeHandler(part, name, value[0]);
        }
        else {
            props.changeHandler(part, name, value);
        }
    }

    return (
        <>
            <Text
                name={"VIN"}
                value={props.form.VIN}
                label={"VIN"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Search
                name={"ModelYear"}
                value={[props.form.ModelYear]}
                values={values.modelYears}
                label={"Model Year"}
                defaultLabel="Select a Year"
                onChange={(name, value) => changeHandler(name, value)}
                size={10}
            />
            <Search
                name={"Make"}
                value={[props.form.Make]}
                values={values.makes}
                label={"Make"}
                defaultLabel="Select a Make"
                onChange={(name, value) => changeHandler(name, value)}
                size={10}
            />
            <Search
                name={"Model"}
                value={[props.form.Model]}
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
                label={"Mileage"}
                onChange={(name, value) => changeHandler(name, value)}
            />
            <Text
                name={"LicensePlate"}
                value={props.form.LicensePlate}
                label={"License Plate"}
                onChange={(name, value) => changeHandler(name, value)}
            />
        </>
    )
}