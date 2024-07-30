import { Makes } from "@/database/Export";
import { useEffect, useState } from "react";
import { Text, Search } from "@/components/Input/Export";
import { FormPart } from "@/process/Employee/Update/Form/UpdateForm";
import { LoadMakeModelModelYear, LoadModels, ModelYears } from "@/lib/Decoder/Decoder";

interface VehicleProps {
    form: {
        Make:           string;
        Model:          string;
        ModelYear:      number;
        VIN:            string;
        Mileage:        number;
        LicensePlate:   string;
    }
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

    
    const loadModels = async (modelYear: number, make: string) => {
        const models = await LoadModels(modelYear, make);
        setValues({...values, models});
    }

    const loadMakeModelModelYear = async (vin: string) => {
        if (!vin)
            return;

        const {make, model, models, modelYear} = await LoadMakeModelModelYear(vin, values.makes);
        setValues({...values, models});

        // No Matching Vehicle Found
        if (!make)        
            return;

        return {
            make:       make, 
            model:      model, 
            modelYear: modelYear
        };
    }

    const changeHandler = async (name: string, value: any) => {
        if (name === 'VIN') {
            props.changeHandler('Vehicle', '', value);
            if (value.length < 17)
                return;

            const data = await loadMakeModelModelYear(value);
            if (!data)
                return;

            props.changeHandler('Vehicle', '', {
                VIN:        value,
                Make:       data.make[0],
                Model:      data.model[0],
                ModelYear:  data.modelYear[0]
            });
        }
        else if (['Make', 'Model', 'ModelYear'].includes(name)) {
            if (name === 'Make') {
                loadModels(props.form.ModelYear, value[0]);
                props.changeHandler('Vehicle', 'Model', '');
                props.changeHandler('Vehicle', 'Make', value[0]);
            }
            else if (name === 'ModelYear') {
                loadModels(value[0], props.form.Make);
                props.changeHandler('Vehicle', 'Model', '');
                props.changeHandler('Vehicle', 'ModelYear', value[0]);
            }
            else {
                props.changeHandler('Vehicle', 'Model', value[0]);
            }
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