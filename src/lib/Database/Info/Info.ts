"use server";
import { fetchPool } from "../Pool";
import { User } from "../User";
import { DB_Status, DB_Service, DB_Label, DB_Make } from "../Types";
import { SessionParameter } from "../Parameters";

export async function DB_Statuses(user: User = User.Standard): Promise<Array<DB_Status>> {
    try {
        const pool = await fetchPool(user);
        if (!pool)
            throw "Info.Statuses: Undefined Pool";
        const output = await pool.request().execute("Info.Statuses");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export async function DB_Services(user: User = User.Standard): Promise<Array<DB_Service>> {
    try {
        const pool = await fetchPool(user);
        if (!pool)
            throw "Info.Services: Undefined Pool";
        const output = await pool.request().execute("Info.Services");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export async function DB_Labels(user: User = User.Standard): Promise<Array<DB_Label>> {
    try {
        const pool = await fetchPool(user);
        if (!pool)
            throw "Info.Labels: Undefined Pool";
        const output = await pool.request().execute("Info.Labels");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}


export async function DB_Makes(user: User = User.Standard): Promise<Array<DB_Make>> {
    try {
        const pool = await fetchPool(user);
        if (!pool)
            throw "Info.Makes: Undefined Pool";
        const output = await pool.request().execute("Info.Makes");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export async function BeginCommit(
    user: User = User.Standard,
    data?: SessionParameter
): Promise<boolean> {
    try {
        const pool = await fetchPool(user);
        if (!pool)
            throw 'Info.BeginCommit: Undefined Pool';

        await pool.request()
            .execute('Info.BeginCommit');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export async function EndCommit(
    user: User = User.Standard,
    data?: SessionParameter
): Promise<boolean> {
    try {
        const pool = await fetchPool(user, data);
        if (!pool)
            throw 'Info.EndCommit: Undefined Pool';

        await pool.request()
            .execute('Info.EndCommit');

        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}