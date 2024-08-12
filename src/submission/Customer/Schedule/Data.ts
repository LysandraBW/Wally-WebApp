export type DataKeys = 'FName' | 'LName' | 'Email' | 'Phone' | 'VIN' | 'Make' | 'Model' | 'ModelYear' | 'Services';
export type GenericDataType = {[k in DataKeys]: any};

export interface DataType extends GenericDataType {
    FName:      string;
    LName:      string;
    Email:      string;
    Phone:      string;
    VIN:        string;
    Make:       Array<string>;
    Model:      Array<string>;
    ModelYear:  Array<number>;
    Services:   Array<number>;
}

export const InitialData = async (): Promise<DataType> => {
    return {
        FName:      '',
        LName:      '',
        Email:      '',
        Phone:      '',
        VIN:        '',
        Make:       [],
        Model:      [],
        ModelYear:  [],
        Services:   []
    }
}