import TextField from "@/component/Form/Text/TextField";
import ItemFormGroup from "@/features/ItemManager/Form/ItemFormGroup";
import { ThingManagerProps, ThingManagerWrapper } from "../ThingManager";
import useThingManager from "../useThingManager";

export default function PartForm<DB_AppointmentPart, Part, Parts>(props: ThingManagerProps<DB_AppointmentPart, Part, Parts>) {
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
            <ItemFormGroup head="Part">
                <TextField
                    type="text"
                    name="PartName"
                    label="Part Name"
                    value={thingManager.thingForm.getInput("PartName").data}
                    state={thingManager.thingForm.getInput("PartName").state}
                    onChange={thingManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="PartNumber"
                    label="Part Number"
                    value={thingManager.thingForm.getInput("PartNumber").data}
                    state={thingManager.thingForm.getInput("PartNumber").state}
                    onChange={thingManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
            <ItemFormGroup head="Amount">
                <TextField
                    type="text"
                    name="Quantity"
                    label="Quantity"
                    value={thingManager.thingForm.getInput("Quantity").data}
                    state={thingManager.thingForm.getInput("Quantity").state}
                    onChange={thingManager.updateInputValue}
                    onBlur={undefined}
                />
                <TextField
                    type="text"
                    name="UnitCost"
                    label="Unit Cost"
                    value={thingManager.thingForm.getInput("UnitCost").data}
                    state={thingManager.thingForm.getInput("UnitCost").state}
                    onChange={thingManager.updateInputValue}
                    onBlur={undefined}
                />
            </ItemFormGroup>
        </ThingManagerWrapper>
    )
}