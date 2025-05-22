import { request, Body } from "../request";
import { EventUpdates } from "@/pages/employee/events/_DEF";

export async function UpdateEmployeeEvents(updates: EventUpdates) {
    try {
        for (const UPDATE of updates.Update) {
            request("POST", `/employee/event/${UPDATE.EventID}`, {
                name: UPDATE.Name,
                date: UPDATE.Date,
                summary: UPDATE.Summary
            });
        }

        for (const INSERT of updates.Insert.Event) {
            const output = await request("PUT", `/employee/event`, {
                name: INSERT.Name,
                date: INSERT.Date,
                summary: INSERT.Summary
            });

            if (!output || !output.EventID)
                throw "Error";

            if (INSERT.Sharees) {
                for (const eventShareeID of INSERT.Sharees) {
                    request("PUT", `/employee/event/${output.EventID}/sharee`, {
                        eventShareeID
                    });
                }
            }
        }

        for (const INSERT of updates.Insert.Sharee) {
            request("PUT", `/employee/event/${INSERT.EventID}/sharee`, {
                eventShareeID: INSERT.EventShareeID
            });
        }

        for (const DELETE of updates.Delete.Sharee) {
            request("DELETE", `/employee/event/${DELETE.EventID}/sharee`, {
                eventShareeID: DELETE.EventShareeID
            });
        }

        for (const DELETE of updates.Delete.Event) {
            request("DELETE", `/employee/event/${DELETE.EventID}`);
        }

        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}