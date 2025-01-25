import TextField from "@/component/Form/Text/TextField";
import { FilterManager } from "./managers/useFilterManager";

interface SearchBar {
    filterManager: FilterManager;
}

export default function SearchBar(props: SearchBar) {
    const updateSearch = (name: string, value: string) => {
        props.filterManager.setSearch(value);
    }

    return (
        <div>
            <TextField
                name="search"
                placeholder="Search Appointments"
                value={props.filterManager.search}
                onChange={updateSearch}
            />
        </div>
    )
}