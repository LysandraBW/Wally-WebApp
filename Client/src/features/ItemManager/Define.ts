import { FormTest } from "../Form/useForm/Form";

export abstract class Define<BaseItem, Item, Items> {
    formID = "";
    itemID = "";
    itemName = "";
    
    abstract test(..._: any[]): FormTest;
    abstract buildItem(baseItem: BaseItem | null): Item;
    abstract buildItems(baseItems: Array<BaseItem>): Items;
}