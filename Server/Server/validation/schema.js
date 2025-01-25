import { isInteger, isUniqueIdentifier } from "./effect.js";

// Below are pieces of data that are often required in the validation
// of various procedures.

export const appointmentKeySchema = {
    sessionID: isUniqueIdentifier,
    appointmentID: isUniqueIdentifier
}

export const eventKeySchema = {
    sessionID: isUniqueIdentifier,
    eventID: isInteger
}

export const noteKeySchema = {
    sessionID: isUniqueIdentifier,
    noteID: isInteger
}