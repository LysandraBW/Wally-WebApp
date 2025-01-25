import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../../../constant.js";
import { getEmployeePool } from "../../../../connectionPool.js";
import { isUniqueIdentifier, isInteger, isBitOptional, isString, isIntegerOptional } from "../../../../validation/effect.js";
import { organizeManyAppointmentsLabels } from "../../../../util/organizeManyAppointmentsLabels.js";

export async function execSelectAllAppointments(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("PageNumber", sql.Int, data.pageNumber)
            .input("PageSize", sql.Int, data.pageSize)
            .input("LookAhead", sql.Int, data.lookAhead)
            .input("Search", sql.VarChar(320), data.search)
            .input("Deleted", sql.Bit, data.deleted)
            .input("LabelID", sql.Int, data.labelID)
            .input("StatusID", sql.Int, data.statusID)
            .input("FName", sql.Bit, data.fName)
            .input("LName", sql.Bit, data.lName)
            .input("Make", sql.Bit, data.make)
            .input("Model", sql.Bit, data.model)
            .input("ModelYear", sql.Bit, data.modelYear)
            .input("CreationDate", sql.Bit, data.creationDate)
            .input("StartDate", sql.Bit, data.startDate)
            .input("EndDate", sql.Bit, data.endDate)
            .input("Cost", sql.Bit, data.cost)          
            .execute("Appointment.GetAll");

        const recordsets = output.recordsets;

        // The labels are organized in an unhelpful way.
        // So, we're going to organize them by apt ID and
        // label name, so that we can easily find a label
        // for a given appointment. This is alike to what
        // we did in selectAppointment, but on the scale
        // of thousands of appointments.
        const labels = recordsets[2];
        const sortedLabels = organizeManyAppointmentsLabels(labels);

        return {
            Appointments: recordsets[0],
            Count: recordsets[1][0].Count,
            Labels: sortedLabels
        }
    }
    catch (err) {
        console.error(err);
        return {
            Appointments: [],
            Count: 0,
            Labels: {}
        };
    }
}

export const testSelectAllAppointments = z.object({
    sessionID: isUniqueIdentifier,
    pageNumber: isIntegerOptional,
    pageSize: isIntegerOptional,
    lookAhead: isIntegerOptional,
    search: isString.max(320).optional(),
    deleted: isBitOptional,
    labelID: isIntegerOptional,
    statusID: isIntegerOptional,
    fName: isBitOptional,
    lName: isBitOptional,
    make: isBitOptional,
    model: isBitOptional,
    modelYear: isBitOptional,
    creationDate: isBitOptional,
    startDate: isBitOptional,
    endDate: isBitOptional,
    cost: isBitOptional
});

export const selectAllAppointments = {
    test: (input) => testSelectAllAppointments.safeParse(input),
    exec: (input) => execSelectAllAppointments(input)
}