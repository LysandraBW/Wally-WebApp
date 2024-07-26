import { Makes } from "@/lib/Database/Export";
import { DecodeVIN, Models, ModelYears } from "@/lib/Decoder/Decoder";
import { Parts } from "@/lib/Form/Employee/Update/Form";
import { useEffect, useState } from "react";
import { Text, Search } from "@/components/Input/Export";

interface VehicleProps {
    form: {
        Make: string;
        Model: string;
        ModelYear: number;
        VIN: string;
        Mileage: number;
        LicensePlate: string;
    }
    changeHandler: (part: Parts, name: string, value: any) => void;
}

export default function Vehicle(props: VehicleProps) {
    const [values, setValues] = useState<{
        makes: Array<[string, string]>;
        models: Array<[string, string]>;
        modelYears: Array<[number, string]>;
    }>({
        makes: [],
        models: [],
        modelYears: []
    });

    useEffect(() => {
        const loadValues = async () => {
            // Load Makes and Model Years
            const makes: Array<[string, string]> = (await Makes()).map(m => [m.Make, m.Make]);
            const models: Array<[string, string]> = await getModels(props.form.ModelYear, props.form.Make);
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

    const getModels = async (modelYear: number, make: string) => {
        // Requires Model Year + Make
        if (modelYear && make) {
            // Get Models
            const fetchedModels = (await Models(modelYear, make));
            let models: Array<[string, string]> = fetchedModels.map(m => [m.Model_Name, m.Model_Name]);

            // Removing Duplicates
            let duplicateModels: {[k: string]: number} = {};
            models = models.filter(model => {
                // Duplicate Found
                if (duplicateModels[model[0]])
                    return false;
                duplicateModels[model[0]] = 1;
                return true;
            });

            // Sorting by Label
            models.sort((a, b) => a[1].localeCompare(b[1]));
            return models;
        }
        else {
            return [];
        }
    }

    const loadModels = async (modelYear: number, make: string) => {
        // Requires Model Year + Make
        if (modelYear && make) {
            // Get Models
            const fetchedModels = (await Models(modelYear, make));
            let models: Array<[string, string]> = fetchedModels.map(m => [m.Model_Name, m.Model_Name]);

            // Removing Duplicates
            let duplicateModels: {[k: string]: number} = {};
            models = models.filter(model => {
                // Duplicate Found
                if (duplicateModels[model[0]])
                    return false;
                duplicateModels[model[0]] = 1;
                return true;
            });

            // Sorting by Label
            models.sort((a, b) => a[1].localeCompare(b[1]));
            setValues({...values, models});
        }
        else {
            setValues({...values, models: []});
        }
    }

    const loadMakeModelModelYear = async (vin: string) => {
        if (!vin)
            return;

        // Getting Make, Model, ModelYear (MMMY)
        const MMMY = await DecodeVIN(vin);
        const Make = values.makes.find(m => m[0].toUpperCase() === MMMY.Make.toUpperCase());
        const Model = MMMY.Model;
        const ModelYear = MMMY.ModelYear;

        if (!Make)
            return;

        // Load Models
        loadModels(ModelYear, Make[0]);
        
        // Return Decoded Info
        return {
            make: [Make[0]], 
            model: [Model], 
            modelYear: [ModelYear]
        }
    }

    const changeHandler = async (name: string, value: any) => {
        if (name === 'VIN') {
            props.changeHandler('Vehicle', name, value);
            const MMMY = await loadMakeModelModelYear(value);
            if (!MMMY)
                return;

            props.changeHandler('Vehicle', 'Make', MMMY.make);
            props.changeHandler('Vehicle', 'Model', MMMY.model);
            props.changeHandler('Vehicle', 'ModelYear', MMMY.modelYear);
        }
        else {
            if (name === 'Make') {
                loadModels(props.form.ModelYear, value[0]);
                props.changeHandler('Vehicle', 'Model', '');
            }
            else if (name === 'ModelYear') {
                loadModels(value[0], props.form.Make);
                props.changeHandler('Vehicle', 'Model', '');
            }
            props.changeHandler('Vehicle', name, value[0]);
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
        </>
    )
}