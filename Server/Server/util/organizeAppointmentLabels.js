// Organize Appointment Labels
// Organizes the labels (i.e. seen, flag, star)
// of an appointment so that the programmer can
// easily access a label by indexing into an object.
// Example: sortedLabels["flag"] = ...
export function organizeAppointmentLabels(labels) {
    const sortedLabels = {};

    for (const label of labels)
        sortedLabels[label.Label] = label;

    return sortedLabels;
}