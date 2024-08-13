import { FlattenedServices, LayeredServices, loadLayeredServices, loadServices } from "@/lib/Service/Load";

export type LoadedKeys = 'FlattenedServices' | 'LayeredServices';

export interface LoadedType {
    Layered:    LayeredServices;
    Flattened:  FlattenedServices;
}

export const InitialLoaded = async (): Promise<LoadedType> => {
    const services = await loadLayeredServices();
    return {
        Flattened:  services.flattened,
        Layered:    services.layered
    }
}