import { Fragment, useEffect, useState } from "react";
import { strictSubsetOf } from "@/lib/Zod/InputTest";
import { fetchModels } from "@/services/NHTSA/fetchModels";
import { fetchVehicle } from "@/services/NHTSA/fetchVehicle";
import VehicleMakePairs from "@/services/DB/Information/SelectVehicleMakePairs";
import { loadModelYears } from "@/services/NHTSA/loadModelYears";
import { UseForm } from "@/features/Form/useForm/useForm";
import { Options } from "@/features/Form/DEF";
import getValues from "@/features/Form/helpers/getValues";
import TextField from "@/component/Form/Text/Text";
import { MAKE_ERR_MSG, MODEL_ERR_MSG, MODEL_YEAR_ERR_MSG } from "./_DEF";

interface VehicleFormProps {
    form: UseForm;
}

export default function VehicleForm(props: VehicleFormProps) {
    const [makes, setMakes] = useState<Options>([]);
    const [models, setModels] = useState<Options>([]);
    const [modelYears, setModelYears] = useState<Options>([]);

    useEffect(() => {
        initializeMake();
        initializeModelYears();
        initializeModel();
    }, []);

    const initializeMake = async () => {
        const makes = await VehicleMakePairs();
        setMakes(makes);

        const makeValues = getValues(makes);
        const makeTest = strictSubsetOf(makeValues, MAKE_ERR_MSG)
        props.form.setInputTest("make", makeTest);
    }

    const initializeModelYears = async () => {
        const modelYears = loadModelYears();
        setModelYears(modelYears);

        const modelYearValues = getValues(modelYears);
        const modelYearTest = strictSubsetOf(modelYearValues, MODEL_YEAR_ERR_MSG);
        props.form.setInputTest("modelYear", modelYearTest);
    }

    const initializeModel = async () => {
        const make = props.form.getInput("make").data[0];
        const modelYear = props.form.getInput("modelYear").data[0];
        if (!make || !modelYear)
            return;

        const model = props.form.getInput("model").data;
        updateVehicleModels(modelYear, make, model);
    
    }
    
    const updateVehicle = async (makes: Options, VIN: string) => {
        if (!VIN)
            return;
    
        const vehicle = await fetchVehicle(VIN, makes);
        if (!vehicle.decoded)
            return;
        
        setModels(vehicle.models);
        props.form.setInputTest("model", strictSubsetOf(getValues(vehicle.models), MODEL_ERR_MSG));
        props.form.updateInputData("model", vehicle.model);
        props.form.updateInputData("make", vehicle.make);
        props.form.updateInputData("modelYear", vehicle.modelYear);
    }

    const updateVehicleModels = async (modelYear: string, make: string, model: Array<string> = []) => {
        const models = await fetchModels(modelYear, make);
        setModels(models);
        
        props.form.setInputTest("model", strictSubsetOf(getValues(models), MODEL_ERR_MSG));
        props.form.setInputData("model", model);
    }

    const updateVIN = async (name: string, value: any) => {
        updateVehicle(makes, value);
        props.form.updateInputData(name, value);
    }

    const updateMake = async (name: string, value: any) => {
        const make = value[0];
        const modelYear = props.form.getInput("modelYear").data[0];
        updateVehicleModels(modelYear, make);
        props.form.updateInputData(name, value);
    }

    const updateModelYear = async (name: string, value: any) => {
        const modelYear = value[0];
        const make = props.form.getInput("make").data[0];
        updateVehicleModels(modelYear, make);
        props.form.updateInputData(name, value);
    }
    
    return (
        <Fragment>
            <TextField
                name="vin"
                type="text"
                label="Vehicle Identification Number"
                value={props.form.getInput("vin").data}
                state={props.form.getInput("vin").state}
                onChange={updateVIN}
            />
            {/* <Search
                name="modelYear"
                label="Year"
                toggleLabel="Select Model Year"
                state={props.form.getInput("modelYear").state}
                values={props.form.getInput("modelYear").data}
                options={modelYears}
                onChange={updateModelYear}
                disabled={false}
            />
            <Search
                name="make"
                label="Make"
                toggleLabel="Select Make"
                state={props.form.getInput("make").state}
                values={props.form.getInput("make").data}
                options={makes}
                onChange={updateMake}
                disabled={false}
            />
            <Search
                name="model"
                label="Model"
                toggleLabel="Select Model"
                state={props.form.getInput("model").state}
                values={props.form.getInput("model").data}
                options={models}
                onChange={props.form.updateInputData}
                disabled={false}
            /> */}
        </Fragment>
    )
}