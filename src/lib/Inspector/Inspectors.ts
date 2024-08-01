export interface ErrorStructure {
    [inputName: string]: {
        state: boolean;
        message: string;
    }
}

export const Regexes = {
    UniqueIdentifier: /[A-Z0-9-]{36}/
}