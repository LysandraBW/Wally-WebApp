import { z } from "zod";
import sql from "mssql";
import { UNDEFINED_POOL } from "../../constant.js";
import { getEmployeePool } from "../../connectionPool.js";
import { isName, isEmail, isPhone } from "../../validation/effect.js";
import { appointmentKeySchema } from "../../validation/schema.js";

export async function execUpdateCustomer(data) {
    try {
        const pool = await getEmployeePool(data.sessionID);
        if (!pool)
            throw UNDEFINED_POOL;

        await pool.request()
            .input("SessionID", sql.Char(36), data.sessionID)
            .input("AppointmentID", sql.UniqueIdentifier, data.appointmentID)
            .input("FName", sql.NVarChar(50), data.fName)
            .input("LName", sql.NVarChar(50), data.lName)
            .input("Email", sql.NVarChar(320), data.email)
            .input("Phone", sql.NVarChar(15), data.phone)
            .execute("Customer.UpdateCustomer");

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export const testUpdateCustomer = z.object({
    ...appointmentKeySchema,
    fName: isName.or(z.null()),
    lName: isName.or(z.null()),
    email: isEmail.or(z.null()),
    phone: isPhone.or(z.null())
});

export const updateCustomer = {
    test: (input) => testUpdateCustomer.safeParse(input),
    exec: (input) => execUpdateCustomer(input)
}