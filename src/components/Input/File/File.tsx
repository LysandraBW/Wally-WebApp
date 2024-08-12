import { Input } from "../Input";
import { ReadInputProps } from '../MutateInput';

interface FileProps extends ReadInputProps {
    accept?: string;
    multiple?: boolean;
}

export default function File(props: FileProps) {
    return (
        <Input
            label={props.label}
            input={
                <input
                    type="file"
                    name={props.name}
                    onChange={event => {
                        const {name, files} = event.target;
                        props.onChange && props.onChange(name, files);
                    }}
                    accept={props.accept}
                    multiple={props.multiple}
                />
            }
            state={props.state || {state: false, message: ''}}
        />
    )
}