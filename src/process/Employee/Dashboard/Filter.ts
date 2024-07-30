export interface FilterStructure {
    PageNumber:     number;
    PageSize:       number;
    [k: string]:    any;
}

export const Filter: FilterStructure = {
    PageNumber: 1,
    PageSize:   5
}