import TextField from "@/component/Form/Text/TextField";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import { ThingManagerProps, ThingManagerWrapper } from "../ThingManager";
import useThingManager from "../useThingManager";

export default function RepairForm<DB_AppointmentRepair, Repair, Repairs>(props: ThingManagerProps<DB_AppointmentRepair, Repair, Repairs>) {
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
                    name="Repair"
                    label="Repair"
                    value={thingManager.thingForm.getInput("Repair").data}
                    state={thingManager.thingForm.getInput("Repair").state}
                    onChange={thingManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ThingManagerWrapper>
    )
}