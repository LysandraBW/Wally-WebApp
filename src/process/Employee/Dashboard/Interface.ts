export interface FilterStructure {
    PageNumber: number;
    PageSize: number;
    [k: string]: any;
}

export const DefaultFilter: FilterStructure = {
    PageNumber: 1,
    PageSize: 5
}