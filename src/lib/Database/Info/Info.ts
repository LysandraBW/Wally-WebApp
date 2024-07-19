"use server";
import sql from "mssql";
import { config, ConfigType } from "../Connection";

type Status = {
    StatusID: number;
    Status: string;
}

export async function GetStatus(configType: ConfigType = ConfigType.Default): Promise<Array<Status>> {
    try {
        const pool = await sql.connect(await config(configType));
        const res = await sql.query("EXEC Info.GetStatus");
        return res.recordset;
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

export async function GetStatusDesc(configType: ConfigType = ConfigType.Default): Promise<Array<StatusDesc>> {
    try {
        await sql.connect(await config(configType));
        const res = await sql.query("EXEC Info.GetStatusDesc");
        return res.recordset;
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

export async function GetService(configType: ConfigType = ConfigType.Default): Promise<Array<Service>> {
    try {
        await sql.connect(await config(configType));
        const res = await sql.query("EXEC Info.GetService");
        return res.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

type Label = {
    Label: string;
}

export async function GetLabel(configType: ConfigType = ConfigType.Default): Promise<Array<Label>> {
    try {
        await sql.connect(await config(configType));
        const res = await sql.query("EXEC Info.GetLabel");
        return res.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

type Make = {
    Make: string;
}

export async function GetMake(configType: ConfigType = ConfigType.Default): Promise<Array<Make>> {
    try {
        await sql.connect(await config(configType));
        const res = await sql.query("EXEC Info.GetMake");
        return res.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}