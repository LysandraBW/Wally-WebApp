import { ServiceMap, ServiceT2Pairs as ServiceDeep, GetT2Services as DeepServices } from "@/services/DB/Information/GetT2Services";
import { useEffect, useState } from "react";
import { Service, Services } from "./_DEF";
import { Service as DB_AppointmentService } from "waltronics-types";
import useItemManager, { UseItemManagerProps } from "@/features/ItemManager/useItemManager";
import { sameMap } from "@/features/ItemManager/helpers/sameMap";
import { Options } from "@/features/Form/DEF";

export default function useServiceManager(props: UseItemManagerProps<DB_AppointmentService, Service, Services>) {
    const itemManager = useItemManager(props);
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
            setServiceMap(services.map);
            setServiceDeep(services.deep);
            
            const upperDivisions = Object.keys(services.deep);
            setUpperDivisions(upperDivisions);

            const lowerDivisions = Object.keys(services.deep[upperDivisions[0]]);
            setLowerDivisions(lowerDivisions);
        }
        load();
    }, []);

    useEffect(() => {
        if (!serviceMap)
            return;
        const values: Array<string> = [];
        const services = Object.values(itemManager.newItems) as Array<Service>;
        for (const service of services) {
            const serviceID = service.ServiceID;
            if (!serviceID)
                continue;
            
            const defaultService = serviceMap[serviceID];
            if (!defaultService)
                continue;

            if (sameMap(service as any, defaultService as any, ["Class", "Division", "Service"]))
                values.push(serviceID);    
        }
        setValue(values);
    }, [itemManager.newItems, serviceMap]);

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
        const updatedItems = {...itemManager.newItems as any};
        updatedItems[itemManager.nextCreateID] = props.defineItem.buildItem({
            ...serviceMap[serviceID],
            AppointmentID: "",
            AppointmentServiceID: -1
        });
        itemManager.setNextCreateID(i => i - 1);
        itemManager.setNewItems(updatedItems);
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
        ...itemManager
    }
}