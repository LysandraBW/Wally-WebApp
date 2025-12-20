import { EventUpdates } from "@/app/employee/home/events/_DEF";
import { request, Body } from "../request";

export async function UpdateEmployeeEvents(updates: EventUpdates) {
    try {
        let allOutput = true;

        for (const UPDATE of updates.Update) {
            const {output} = await request("POST", `/employee/event/${UPDATE.EventID}`, {
                name: UPDATE.Name,
                date: UPDATE.Date,
                summary: UPDATE.Summary
            });

            allOutput = allOutput && output !== false;
        }

        for (const INSERT of updates.Insert.Event) {
            const output = await request("PUT", `/employee/event`, {
                name: INSERT.Name,
                date: INSERT.Date,
                summary: INSERT.Summary
            });

            if (!output || !output.output) {
                allOutput = false;
                continue;
            }

            if (INSERT.Sharees) {
                for (const eventShareeID of INSERT.Sharees) {
                    request("PUT", `/employee/event/${output.output}/sharee`, {
                        eventShareeID
                    });
                }
            }
        }

        for (const INSERT of updates.Insert.Sharee) {
            const {output} = await request("PUT", `/employee/event/${INSERT.EventID}/sharee`, {
                eventShareeID: INSERT.EventShareeID
            });
            allOutput = allOutput && output !== false;
        }

        for (const DELETE of updates.Delete.Sharee) {
            const {output} = await request("DELETE", `/employee/event/${DELETE.EventID}/sharee`, {
                eventShareeID: DELETE.EventShareeID
            });
            allOutput = allOutput && output !== false;
        }

        for (const DELETE of updates.Delete.Event) {
            const {output} = await request("DELETE", `/employee/event/${DELETE.EventID}`);
            allOutput = allOutput && output !== false;
        }

        return allOutput;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}