import { FormTest } from "@/features/Form/useForm/Form";


export abstract class Define<BaseThing, Thing, Things> {
    // Metadata of Thing
    // thingTest: (..._: any[]) => FormTest; // Used to test a Thing's data
    // thingName: string; // The name of the Thing (i.e., "Service", "Repair")
    // thingIDName: string; // The name of the Thing's ID (i.e., "ServiceID", "RepairID")
    // Functions to process BaseThing(s) into Thing(s).
    // This is all information that must be abstracted.
    // processBaseThing: (baseThing: BaseThing|null) => Thing;
    // processBaseThings: (baseThings: Array<BaseThing>) => MappedThings;
    key = "";
    thingIDName = "";
    thingName = "";
    
    abstract thingTest(..._: any[]): FormTest;
    abstract processBaseThing(baseThing: BaseThing | null): Thing;
    abstract processBaseThings(baseThings: Array<BaseThing>): Things;
}