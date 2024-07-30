import { DB_AppointmentLabel, DB_AppointmentLabels, DB_AllAppointmentLabels } from "../../Types";

// Used in Appointments.GetAll
// Sorted by AppointmentID and Label.
export function sortAllAppointmentLabels(labels: Array<DB_AppointmentLabel>): DB_AllAppointmentLabels {
    const sortedLabels: DB_AllAppointmentLabels = {};

    for (const label of labels) {
        if (!sortedLabels[label.AppointmentID])
            sortedLabels[label.AppointmentID] = {};

        sortedLabels[label.AppointmentID][label.Label] = label;
    }

    return sortedLabels;
}

// Used in Appointments.Get
// Sorted by Label
export function sortAppointmentLabels(labels: Array<DB_AppointmentLabel>): DB_AppointmentLabels {
    const sortedLabels: DB_AppointmentLabels = {};

    for (const label of labels) {
        sortedLabels[label.Label] = label;
    }

    return sortedLabels;   
}

// This is in the context of all the appointment labels.
export function updateAppointmentLabel(labelName: string, appointmentID: string, labels: DB_AllAppointmentLabels): DB_AllAppointmentLabels {
    // Create a Copy
    const allLabels = {...labels};

    // Flip Value
    const labelValue = allLabels[`${appointmentID}`][`${labelName}`].Value || 0;
    allLabels[`${appointmentID}`][`${labelName}`].Value = 1 - labelValue; 
    
    return allLabels;
}

// This is in the context of only one appointment.
export function updateLabel(labelName: string, labels: DB_AppointmentLabels): DB_AppointmentLabels {
    // Create a Copy
    const allLabels = {...labels};

    // Flip Value
    const labelValue = allLabels[`${labelName}`].Value || 0;
    allLabels[`${labelName}`].Value = 1 - labelValue; 
    
    return allLabels;
}