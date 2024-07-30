import { Text, Search, Checkbox } from "@/components/Input/Export";

interface VehicleFormProps {
    form: {
        vin:        string;
        make:       Array<string>;
        model:      Array<string>;
        modelYear:  Array<number>;
        services:   Array<number>;
    }
    values: {
        makes:      Array<[string, string]>;
        models:     Array<[string, string]>;
        modelYears: Array<[number, string]>;
        services:   {[k: string]: Array<[number, string]>};
    }
    onChange: (name: string, value: any) => void;
}

export default function VehicleForm(props: VehicleFormProps) {
    return (
        <div>
            <Text
                name={"vin"}
                value={props.form.vin}
                label={"VIN"}
                onChange={(name, value) => props.onChange(name, value)}
            />
            <Search
                name={"modelYear"}
                value={props.form.modelYear}
                values={props.values.modelYears}
                label={"Model Year"}
                defaultLabel="Select a Year"
                onChange={(name, value) => props.onChange(name, value)}
                size={10}
            />
            <Search
                name={"make"}
                value={props.form.make}
                values={props.values.makes}
                label={"Make"}
                defaultLabel="Select a Make"
                onChange={(name, value) => props.onChange(name, value)}
                size={10}
            />
            <Search
                name={"model"}
                value={props.form.model}
                values={props.values.models}
                label={"Model"}
                defaultLabel="Select a Model"
                onChange={(name, value) => props.onChange(name, value)}
                disabled={!props.form.modelYear[0] || !props.form.make[0]}
                size={10}
            />
            <Checkbox
                name="services"
                value={props.form.services}
                values={props.values.services}
                label={"Service"}
                onChange={(name, value) => props.onChange(name, value)}
            />
        </div>
    )
}