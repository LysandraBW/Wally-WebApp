import { DB_Appointment, DB_AppointmentService } from "@/database/Types";

export type DataKeys = 'Service' | 'Division' | 'Class';

export interface ServicesStructure {
    [serviceID: string]: DB_AppointmentService;
}

export interface ServicesFormStructure {
    AppointmentID: string;
    Services: ServicesStructure;
}

export const InitialServicesForm = async (appointment: DB_Appointment): Promise<ServicesFormStructure> => {
    const services: ServicesStructure = {};
    for (const service of appointment.Services)
        services[service.AppointmentServiceID] = service;

    return {
        AppointmentID: appointment.AppointmentID,
        Services: services
    };   
}