"use server";
import { User, fetchPool } from "../Pool";

type Status = {
    StatusID: number;
    Status: string;
}

export async function GetStatus(user: User = User.Default)
: Promise<Array<Status>> {
    try {
        const pool = await fetchPool(user);
        if (!pool)
            throw "Undefined Pool";

        const output = await pool.request().execute("Info.GetStatus");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

type StatusDesc = {
    StatusID: string;
    Status: string;
    Description: string;
}

export async function GetStatusDesc(user: User = User.Default)
: Promise<Array<StatusDesc>> {
    try {
        const pool = await fetchPool(user);
        if (!pool)
            throw "Undefined Pool";

        const output = await pool.request().execute("EXEC GetStatusDesc");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

type Service = {
    Type: string;
    TypeID: number;
    Group: string;
    GroupID: number;
    Service: string;
    ServiceID: number;
}

export async function GetService(user: User = User.Default)
: Promise<Array<Service>> {
    try {
        const pool = await fetchPool(user);
        if (!pool)
            throw "Undefined Pool";
        
        const output = await pool.request().execute("Info.GetService");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

type Label = {
    Label: string;
}

export async function GetLabel(user: User = User.Default)
: Promise<Array<Label>> {
    try {
        const pool = await fetchPool(user);
        if (!pool)
            throw "Undefined Pool";
        
        const output = await pool.request().execute("Info.GetLabel");
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

export async function GetMake(user: User = User.Default)
: Promise<Array<Make>> {
    try {
        const pool = await fetchPool(user);
        if (!pool)
            throw "Undefined Pool";
        
        const output = await pool.request().execute("Info.GetMake");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}