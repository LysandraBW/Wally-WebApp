import { ServiceMap, ServiceT2Pairs as ServiceDeep, GetT2Services as DeepServices } from "@/services/DB/Information/GetT2Services";
import { useEffect, useState } from "react";
import { Service as DB_AppointmentService } from "waltronics-types";
import { Options } from "@/features/Form/DEF";
import useThingsManager, { UseThingsManagerProps } from "../useThingsManager";
import { MappedServices, Service } from "./_DEF";
import { sameMap } from "@/features/ItemManager/helpers/sameMap";

export default function useServicesManager(props: UseThingsManagerProps<DB_AppointmentService, Service, MappedServices>) {
    const thingsManager = useThingsManager(props);
    const [serviceMap, setServiceMap] = useState<ServiceMap>();
    const [serviceDeep, setServiceDeep] = useState<ServiceDeep>();
    const [upperDivision, setUpperDivision] = useState<string>("");
    const [lowerDivision, setLowerDivision] = useState<string>("");
    const [upperDivisions, setUpperDivisions] = useState<Array<string>>([]);
    const [lowerDivisions, setLowerDivisions] = useState<Array<string>>([]);
    const [value, setValue] = useState<Array<string>>([]);
    const [values, setValues] = useState<Options>([]);

    useEffect(() => {
        const load = async () => {
            const services = await DeepServices();
            setServiceDeep(services.deep);
            setServiceMap(services.map);
            
            const upperDivisions = Object.keys(services.deep);
            setUpperDivisions(upperDivisions);
            setLowerDivisions([]);
        }
        load();
    }, []);

    useEffect(() => {
        if (!serviceMap)
            return;

        const values: Array<string> = [];
        const services = Object.values(thingsManager.newThings) as Array<Service>;
    
        for (const service of services) {
            const serviceID = service.ServiceID;
            if (!serviceID)
                continue;
            
            const defaultService = serviceMap[serviceID];
            if (!defaultService)
                continue;

            const serviceKeys = ["Class", "Division", "Service"];
            if (sameMap(service as any, defaultService as any, serviceKeys))
                values.push(serviceID);    
        }

        setValue(values);
    }, [thingsManager.newThings, serviceMap]);


    useEffect(() => {
        if (!serviceDeep || !upperDivision)
            return;
        
        const lowerDivisions = Object.keys(serviceDeep[upperDivision]);
        setLowerDivisions(lowerDivisions);
    }, [serviceDeep, upperDivision]);


    useEffect(() => {
        if (!serviceDeep || !upperDivision || !lowerDivision)
            return;
        
        const values = serviceDeep[upperDivision][lowerDivision];
        setValues(values);
    }, [upperDivision, lowerDivision]);

    
    const addDefinedService = (serviceID: string) => {
        if (!serviceMap)
            return;

        const updatedThings = {...thingsManager.newThings as any};
        updatedThings[thingsManager.counter] = thingsManager.thingDefinition.processBaseThing({
            ...serviceMap[serviceID],
            AppointmentID: "",
            AppointmentServiceID: -1
        });
        thingsManager.setCounter(i => i - 1);
        thingsManager.setNewThings(updatedThings);
    }

    const selectUpperDivision = (upperDivision: string) => {
        setUpperDivision(upperDivision);
    }

    const selectLowerDivision = (lowerDivision: string) => {
        setLowerDivision(lowerDivision);
    }

    return {
        upperDivision,
        lowerDivision,
        upperDivisions,
        lowerDivisions,
        selectUpperDivision,
        selectLowerDivision,
        value,
        values,
        addDefinedService,
        ...thingsManager
    }
}