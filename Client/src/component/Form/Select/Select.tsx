import { ReactNode, useState } from "react";
import { Label, Options, ReadWriteArrayInputProps, Value } from "@/features/Form/DEF";
import toggleValue from "@/features/Form/helpers/toggleValue";
import Toggle from "./Toggle";
import Wrapper from "./Wrapper";
import Element from "./Element";
import { Field } from "../Field";


export interface SelectV2Props extends Omit<ReadWriteArrayInputProps, "options"> {
    options: Options;
    toggleLabel: string;
    ToggleIcon?: ReactNode;
    ListHeader?: React.ComponentType<{ children?: React.ReactNode }>;
    CheckedIcon?: ReactNode;
    NotCheckedIcon?: ReactNode;
    disabled: boolean;
}


export default function Select(props: SelectV2Props) {
    const [open, setOpen] = useState(false);
    
    const openList = () => {
        if (props.disabled)
            return;
        setOpen(!open);
    }

    const closeList = (event: any): void => {
        if (event.currentTarget.contains(event.relatedTarget))
            return;
        setOpen(false);
    }

    const selectValue = (value: string) => {
        const updatedValue = toggleValue(props.values, value); 
        props.onChange(props.name, updatedValue);
    }
    
    return (
        <Field
            label={props.label}
            state={props.state}
            input={
                <div 
                    className="relative"
                    tabIndex={0}
                    onBlur={closeList}
                    onClick={openList}
                >
                    <Toggle
                        onClick={() => setOpen(true)}
                        icon={props.ToggleIcon}
                        label={props.toggleLabel}
                    />
                    {open &&
                        <Wrapper>
                            {props.ListHeader && 
                                <props.ListHeader/>
                            }
                            {props.options.map(([value, label], i) => (
                                <Element
                                    label={label}
                                    selectValue={() => selectValue(value)}
                                    checked={props.values.includes(value)}
                                    CheckedIcon={props.CheckedIcon}
                                    NotCheckedIcon={props.NotCheckedIcon}
                                />
                            ))}
                        </Wrapper>
                    }
                </div>
            }
        />
    )
}