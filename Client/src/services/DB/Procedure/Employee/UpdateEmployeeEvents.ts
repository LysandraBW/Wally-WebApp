import { queryDB } from "../../queryDB";
import { EventUpdates } from "@/pages/employee/events/_DEF";

export async function UpdateEmployeeEvents(sessionID: string, updates: EventUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            queryDB("employee/updateEvent", {
                sessionID,
                eventID: UPDATE.EventID,
                name: UPDATE.Name,
                date: UPDATE.Date,
                summary: UPDATE.Summary
            });
        }

        for (const INSERT of updates.Insert.Event) {
            const eventID = await queryDB("employee/insertEvent", {
                sessionID,
                name: INSERT.Name,
                date: INSERT.Date,
                summary: INSERT.Summary
            });

            if (!eventID)
                throw "Error";

            if (INSERT.Sharees) {
                for (const eventShareeID of INSERT.Sharees) {
                    queryDB("employee/insertEventSharee", {
                        sessionID,
                        eventID,
                        eventShareeID
                    });
                }
            }
        }

        for (const INSERT of updates.Insert.Sharee) {
            queryDB("employee/insertEventSharee", {
                sessionID,
                eventID: INSERT.EventID,
                eventShareeID: INSERT.EventShareeID
            });
        }

        for (const DELETE of updates.Delete.Sharee) {
            queryDB("employee/deleteEventSharee", {
                sessionID,
                eventID: DELETE.EventID,
                eventShareeID: DELETE.EventShareeID
            });
        }

        for (const DELETE of updates.Delete.Event) {
            queryDB("employee/deleteEvent", {
                sessionID,
                eventID: DELETE.EventID
            });
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}