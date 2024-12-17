import GoBack from "./GoBack";
import Indicator from "./Indicator";
import Button from "@/components/input/button/Button";
import { Fragment, useEffect, useState } from "react";

interface WizardFormProps {
    forms: Array<{
        form: React.ReactNode;
        formHeader: string;
        onContinue: () => Promise<boolean>;
    }>;
    onSubmit: () => Promise<boolean>;
}

export default function WizardForm(props: WizardFormProps) {
    const [partIndex, setPartIndex] = useState(0);
    const [buttonLabel, setButtonLabel] = useState('');

    // The button's label is updated when formIndex is changed.
    useEffect(() => {
        // On Last Part
        if (partIndex === props.forms.length - 1)
            setButtonLabel('Submit');
        // Not on Last Part
        else
            setButtonLabel(`Continue to ${props.forms[partIndex+1].formHeader}`);
    }, [partIndex]);

    const goForward = async () => {
        const nextPartIndex = partIndex + 1;
        const lastPartIndex = props.forms.length - 1;
    
        // Submitting the Form
        if (nextPartIndex > lastPartIndex && await props.onSubmit()) {
            setPartIndex(0);
        }
        // Continuing to the Next Part
        else if (await props.forms[partIndex].onContinue()) {
            setPartIndex(Math.min(nextPartIndex, lastPartIndex));
        }
    }

    const goBackward = () => {
        const prevPartIndex = partIndex - 1;
        setPartIndex(Math.max(0, prevPartIndex));
    }

    return (
        <Fragment>
            <Indicator
                index={partIndex}
                length={props.forms.length}
            />
            <div className='flex flex-col gap-y-8'>
                <div className='flex flex-col gap-y-8 h-min'>
                    {props.forms[partIndex].form}
                </div>
                <div className='flex flex-col'>
                    <Button
                        label={buttonLabel}
                        onClick={goForward}
                    />
                    {partIndex > 0 && 
                        <GoBack
                            onClick={goBackward}
                        />
                    }
                </div>
            </div>
        </Fragment>
    )
}