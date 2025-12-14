import TextField from "@/component/Form/Text/TextField";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import { ThingManagerProps, ThingManagerWrapper } from "../ThingManager";
import useThingManager from "../useThingManager";

export default function ServiceForm<DB_AppointmentService, Service, Services>(props: ThingManagerProps<DB_AppointmentService, Service, Services>) {
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
                    name="Class"
                    label="Class"
                    value={thingManager.thingForm.getInput("Class").data}
                    state={thingManager.thingForm.getInput("Class").state}
                    onChange={thingManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Division"
                    label="Division"
                    value={thingManager.thingForm.getInput("Division").data}
                    state={thingManager.thingForm.getInput("Division").state}
                    onChange={thingManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="Service"
                    label="Service"
                    value={thingManager.thingForm.getInput("Service").data}
                    state={thingManager.thingForm.getInput("Service").state}
                    onChange={thingManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ThingManagerWrapper>
    )
}