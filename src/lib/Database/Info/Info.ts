"use server";
import { fetchPool } from "../Pool";
import { User } from "../User";

export type Status = {
    StatusID: number;
    Status: string;
    Description: string;
}

export async function Statuses(user: User = User.Standard): Promise<Array<Status>> {
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

export type Service = {
    Class: string;
    ClassID: number;
    Division: string;
    DivisionID: number;
    Service: string;
    ServiceID: number;
}

export async function Services(user: User = User.Standard): Promise<Array<Service>> {
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

export type Label = {
    LabelID: number;
    Label: string;
}

export async function Labels(user: User = User.Standard): Promise<Array<Label>> {
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

type Make = {
    Make: string;
}

export async function Makes(user: User = User.Standard): Promise<Array<Make>> {
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