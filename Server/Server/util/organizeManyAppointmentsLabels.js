// Organize Many Appointments Labels
// Organizing the labels of multiple appointments.
// The labels will be organized by (1) apt ID; and
// (2) label name. 
// Example: sorted[aptID][labelName] = ...
export function organizeManyAppointmentsLabels(labels) {
    const sortedLabels = {};

    for (const label of labels) {
        if (!sortedLabels[label.AppointmentID])
            sortedLabels[label.AppointmentID] = {};
        sortedLabels[label.AppointmentID][label.Label] = label;
    }

    return sortedLabels;
}