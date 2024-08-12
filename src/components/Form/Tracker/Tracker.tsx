import Indicator from "./Indicator";
import Button from "@/components/Input/Button/Button";
import { Fragment, useEffect, useState } from "react";
import GoBack from "./GoBack";

interface TrackerProps {
    forms: Array<{
        form: React.ReactNode;
        formHeader: string;
        onContinue: () => Promise<boolean>;
    }>;
    onSubmit: () => Promise<boolean>;
}

export default function Tracker(props: TrackerProps) {
    const [formIndex, setFormIndex] = useState(0);
    const [buttonLabel, setButtonLabel] = useState('');

    useEffect(() => {
        if (formIndex === props.forms.length - 1) {
            setButtonLabel('Submit');
            return;
        }
        setButtonLabel(`Continue to ${props.forms[formIndex+1].formHeader}`);
    }, [formIndex]);

    const goForward = async () => {
        const nextForm = formIndex + 1;
        const lastForm = props.forms.length - 1;
        
        if (nextForm > lastForm) {
            if (await props.forms[formIndex].onContinue() && await props.onSubmit()) {
                setFormIndex(0);
                return;
            }
        }
        else if (await props.forms[formIndex].onContinue()) {
            setFormIndex(Math.min(nextForm, lastForm));
        }
    }

    const goBackward = () => {
        const prevForm = formIndex - 1;
        setFormIndex(Math.max(0, prevForm));
    }

    return (
        <Fragment>
            <Indicator
                index={formIndex}
                length={props.forms.length}
            />
            <div className='flex flex-col gap-y-8'>
                <div className='flex flex-col gap-y-8 h-min'>
                    {props.forms[formIndex].form}
                </div>
                <div className='flex flex-col'>
                    <Button
                        label={buttonLabel}
                        onClick={goForward}
                    />
                    {formIndex > 0 && 
                        <GoBack
                            onClick={goBackward}
                        />
                    }
                </div>
            </div>
        </Fragment>
    )
}