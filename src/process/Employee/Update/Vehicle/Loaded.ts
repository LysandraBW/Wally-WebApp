import { loadMakes, loadModelYears } from "@/lib/Vehicle/Load";

export type LoadedKeys = 'Makes' | 'Models' | 'ModelYears' | 'Services';

export type Makes       = Array<[string, string]>;
export type Models      = Array<[string, string]>;
export type ModelYears  = Array<[number, string]>;

export interface LoadedType {
    Makes:      Makes;
    Models:     Models;
    ModelYears: ModelYears;
}

export const InitialLoaded = async (): Promise<LoadedType> => {
    return {
        Makes:      await loadMakes(),
        ModelYears: await loadModelYears(),
        Models:     []
    }
}