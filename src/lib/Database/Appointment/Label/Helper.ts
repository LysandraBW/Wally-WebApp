import { DB_EmployeeLabel, DB_EmployeeLabels } from "../../Types";

export function getLabel(labels: Array<DB_EmployeeLabel>, labelName: string): number {
    for (const label of labels) {
        if (label.Label === labelName)
            return label.Value;
    }
    return 0;
}

export function sortLabels(labels: Array<DB_EmployeeLabel>): DB_EmployeeLabels {
    const sortedLabels: DB_EmployeeLabels = {};
    for (const label of labels) {
        if (!sortedLabels[label.AppointmentID])
            sortedLabels[label.AppointmentID] = [];
        sortedLabels[label.AppointmentID].push(label);
    }
    return sortedLabels;
}

export function updateLabels(
    labels: DB_EmployeeLabels,
    appointmentID: string,
    labelID: number
): DB_EmployeeLabels {
    for (const label of labels[`${appointmentID}`]) {
        if (label.AppointmentID === appointmentID && label.LabelID === labelID) {
            label.Value = 1 - label.Value;
            return labels;
        }
    }
    labels[`${appointmentID}`].push({
        AppointmentID: appointmentID,
        LabelID: labelID,
        Label: '',
        Value: 1
    });
    return labels;
}

