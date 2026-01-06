import { Fragment, useEffect, useState } from "react";
import { Label, OptionMap, Value } from "@/features/Form/DEF";
import toggleValue from "@/features/Form/helpers/toggleValue";
import Toggle from "./Toggle";
import Wrapper from "./Wrapper";
import Element from "./Element";
import { Field } from "../Field";
import { SelectProps } from "./SelectProps";
import getValuesToLabels from "@/features/Form/helpers/getValuesToLabels";


export default function Select(props: SelectProps) {
    const [open, setOpen] = useState(false);
    const [optionMap, setOptionMap] = useState<OptionMap>();
    const [toggleLabel, setToggleLabel] = useState(props.toggleLabel);
        
    useEffect(() => {
        setOptionMap(getValuesToLabels(props.options));
    }, [props.options]);


    useEffect(() => {
        if (props.multiple || !props.values.length || !optionMap) {
            setToggleLabel(props.toggleLabel);
            return;
        }
        setToggleLabel(optionMap[props.values[0]]);
    }, [props.values, optionMap]);


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
            smaller={props.smaller}
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
                        label={toggleLabel}
                        smaller={props.smaller}
                    />
                    {open &&
                        <Wrapper>
                            {props.ListHeader && 
                                <props.ListHeader/>
                            }
                            {props.options.map(([value, label], i) => (
                                <Fragment key={i}>
                                    <Element
                                        label={label}
                                        selectValue={() => selectValue(value)}
                                        checked={props.values.includes(value)}
                                        CheckedIcon={props.CheckedIcon}
                                        NotCheckedIcon={props.NotCheckedIcon}
                                        smaller={props.smaller}
                                    />
                                </Fragment>
                            ))}
                        </Wrapper>
                    }
                </div>
            }
        />
    )
}