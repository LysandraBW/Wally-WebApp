export function deleteMessage(aLength: number, dLength: number) {
    // All appointments deleted.
    if (aLength - dLength === 0) {
        if (aLength === 1)
            return 'Successfully Deleted Appointment';
        else
            return `Successfully Deleted Appointments`;
    }
    // An appointment was not deleted.
    else {
        if (aLength === 1)
            return 'Unsuccessfully Deleted Appointment';
        else
            return 'Unsuccessfully Deleted Appointments';
    }
}

export function restoreMessage(aLength: number, dLength: number) {
    // All appointments restored.
    if (aLength - dLength === 0) {
        if (aLength === 1)
            return 'Successfully Restored Appointment';
        else
            return `Successfully Restored Appointments`;
    }
    // An appointment was not restored.
    else {
        if (aLength === 1)
            return 'Unsuccessfully Restored Appointment';
        else
            return 'Unsuccessfully Restored Appointments';
    }
}

export function updateSortDirection(v: any) {
    if (v === 0) 
        return null;
    if (v === 1) 
        return 0;
    return 1;
}