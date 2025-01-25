import { queryDB, Body } from "../../queryDB";

export default async function SelectAllAppointments(body: Body) {
    const output = await queryDB("appointment/selectAll", {
        sessionID: body.sessionID,
        pageNumber: body.pageNumber,
        pageSize: body.pageSize,
        lookAhead: body.lookAhead,
        search: body.search,
        deleted: body.deleted,
        labelID: body.labelID,
        statusID: body.statusID,
        fName: body.fName,
        lName: body.lName,
        make: body.make,
        model: body.model,
        modelYear: body.modelYear,
        creationDate: body.creationDate,
        startDate: body.startDate,
        endDate: body.endDate,
        cost: body.cost
    });
    return output;
}