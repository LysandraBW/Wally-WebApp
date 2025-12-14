import TextField from "@/component/Form/Text/TextField";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import { ThingManagerWrapper, ThingManagerProps } from "../ThingManager";
import useThingManager from "../useThingManager";

export default function DiagnosisForm<DB_AppointmentDiagnosis, Diagnosis, MappedDiagnoses>(props: ThingManagerProps<DB_AppointmentDiagnosis, Diagnosis, MappedDiagnoses>) {
    const thingManager = useThingManager(props);

    return (
        <ThingManagerWrapper
            header={props.header}
            canDelete={props.canDelete}
            saveThing={thingManager.saveThing}
            resetThing={thingManager.resetThing}
            closeThing={thingManager.closeThing}
            cancelThing={thingManager.cancelThing}
            deleteThing={thingManager.deleteThing}
        >
            <ItemFormGroup head="">
                <TextField
                    type="text"
                    name="Code"
                    label="Code"
                    value={thingManager.thingForm.getInput("Code").data}
                    state={thingManager.thingForm.getInput("Code").state}
                    onChange={thingManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Message"
                    label="Message"
                    value={thingManager.thingForm.getInput("Message").data}
                    state={thingManager.thingForm.getInput("Message").state}
                    onChange={thingManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ThingManagerWrapper>
    )
}