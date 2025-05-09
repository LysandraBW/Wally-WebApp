import { Fragment, useEffect, useState } from "react";
import { subsetOf } from "@/lib/Zod/InputTest";
import { fetchModels } from "@/services/NHTSA/fetchModels";
import { fetchVehicle } from "@/services/NHTSA/fetchVehicle";
import VehicleMakePairs from "@/services/DB/Procedure/Pairs/VehicleMakePairs";
import { loadModelYears } from "@/services/NHTSA/loadModelYears";
import Search from "@/component/Form/Select/Search/Search";
import { UseForm } from "@/features/Form/useForm/useForm";
import { Options } from "@/features/Form/DEF";
import getValues from "@/features/Form/helpers/getValues";
import TextField from "@/component/Form/Text/TextField";
import MultipleSearch from "@/component/Form/Select/Search/MultipleSearch";

interface VehicleFormProps {
    form: UseForm;
}

export default function VehicleForm(props: VehicleFormProps) {
    const [makes, setMakes] = useState<Options>([]);
    const [models, setModels] = useState<Options>([]);
    const [modelYears, setModelYears] = useState<Options>([]);

    useEffect(() => {
        const initialize = async () => {
            const makes = await VehicleMakePairs();
            setMakes(makes);
            props.form.setInputTest("make", subsetOf(getValues(makes)));

            const modelYears = loadModelYears();
            setModelYears(modelYears);
            props.form.setInputTest("modelYear", subsetOf(getValues(modelYears)));

            const make = props.form.getInput("make").data[0];
            const modelYear = props.form.getInput("modelYear").data[0];
            if (!make || !modelYear)
                return;
            const model = props.form.getInput("model").data;
            updateVehicleModels(modelYear, make, model);
        }
        initialize();
    }, []);

    const updateVehicle = async (makes: Options, VIN: string) => {
        if (!VIN)
            return;
    
        const vehicle = await fetchVehicle(VIN, makes);
        if (!vehicle.decoded)
            return;
        
        setModels(vehicle.models);
        props.form.setInputTest("model", subsetOf(getValues(vehicle.models)));
        props.form.updateInputData("model", vehicle.model);
        props.form.setInputData("make", vehicle.make);
        props.form.setInputData("modelYear", vehicle.modelYear);
    }

    const updateVehicleModels = async (modelYear: string, make: string, model: Array<string> = []) => {
        const models = await fetchModels(modelYear, make);
        setModels(models);
        props.form.setInputTest("model", subsetOf(getValues(models)));
        props.form.setInputData("model", model);
    }

    const updateValue = async (name: string, value: any) => {
        if (name === "vin") {
            updateVehicle(makes, value);
        }
        else if (name === "make") {
            const make = value[0];
            const modelYear = props.form.getInput("modelYear").data[0];
            updateVehicleModels(modelYear, make);
        }
        else if (name === "modelYear") {
            const modelYear = value[0];
            const make = props.form.getInput("make").data[0];
            updateVehicleModels(modelYear, make);
        }
        props.form.updateInputData(name, value);
    }
    
    return (
        <Fragment>
            <TextField
                name="vin"
                type="text"
                label="VIN (Vehicle Identification Number)"
                value={props.form.getInput("vin").data}
                state={props.form.getInput("vin").state}
                onChange={updateValue}
            />
            <Search
                name="modelYear"
                label="Year"
                toggleLabel="Select Model Year"
                state={props.form.getInput("modelYear").state}
                values={props.form.getInput("modelYear").data}
                options={modelYears}
                onChange={updateValue}
                disabled={false}
            />
            <Search
                name="make"
                label="Make"
                toggleLabel="Select Make"
                state={props.form.getInput("make").state}
                values={props.form.getInput("make").data}
                options={makes}
                onChange={updateValue}
                disabled={false}
            />
            <Search
                name="model"
                label="Model"
                toggleLabel="Select Model"
                state={props.form.getInput("model").state}
                values={props.form.getInput("model").data}
                options={models}
                onChange={updateValue}
                disabled={false}
            />
        </Fragment>
    )
}