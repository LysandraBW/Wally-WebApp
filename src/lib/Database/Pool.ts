"use server";
import sql, { ConnectionPool } from "mssql";
import { AuthenticateLogin, AuthenticateLookup } from "./Export";
import { decrypt } from "../Hash/Hash";
import { User } from "./User";

// Environment Variables
const DB        =   process.env.DB      || "";
const DB_C1     =   process.env.DB_C1   || "";
const DB_C2     =   process.env.DB_C2   || "";
const DB_D1     =   process.env.DB_D1   || "";
const DB_D2     =   process.env.DB_D2   || "";
const DB_HOST   =   process.env.DB_HOST || "";

// Pool Storage
const pools = new Map<User|string, Promise<ConnectionPool>>();

const config = (
    user: string,
    pass: string
) => {
    return {
        user:       user,
        password:   pass,
        database:   DB,
        server:     DB_HOST,
        options: {
            encrypt: false,
            trustServerCertificate: false
        }
    }
}

const defaultConfig: ConnectionPool = new sql.ConnectionPool(config(DB_D1, DB_D2));
pools.set(User.Default, defaultConfig.connect());

const customerConfig: ConnectionPool = new sql.ConnectionPool(config(DB_C1, DB_C2));
pools.set(User.Customer, customerConfig.connect());

// Referring To
// npmjs.com/package/mssql#connections-1
export const fetchPool = async (user: User, data: {[k: string]: any} = {}, hashed = false) => {
    if (user === User.Employee) {
        // We assume that we're dealing with an authenticated employee.
        // Only an employee could get this far, as you would need
        // a username and password for anything of substance
        // to be stored in pools[User.Employee]. Moreover,
        // the query shouldn't run successfully for procedures
        // that mutate data.
        if (!data['Username'] || !data['Password']) {
            return pools.get(User.Employee);
        }
        
        let {Username, Password} = data;
        if (hashed) {
            Username = await decrypt(Username);
            Password = await decrypt(Password);
        }
        
        const authenticated = await AuthenticateLogin({
            Username: Username,
            Password: Password
        }, User.Default);

        // Employee Failed Authentication
        if (!authenticated)
            return pools.get(User.Default);

        // Make and Return Pool
        const pool = new sql.ConnectionPool(config(Username, Password));
        const close = pool.close.bind(pool);
        pool.close = (...args: any[]) => {
            pools.delete(Username);
            return close(...(args as []));
        }

        pools.set(User.Employee, pool.connect());
        return pools.get(User.Employee);
    }
    else if (user === User.Customer) {
        const authenticated = await AuthenticateLookup({
            AppointmentID: data.AppointmentID || 0,
            FName: data.FName || "",
            LName: data.LName || "",
            Email: data.Email || ""
        }, User.Default);

        // Customer Failed Authentication
        if (!authenticated)
            return pools.get(User.Default);

        return pools.get(User.Customer);
    }
    else {
        return pools.get(User.Default);
    }
}

export const drainPool = async () => {
    Promise.all(Array.from(pools.values()).map(async (connect) => {
        return connect.then(async (pool) => await pool.close());
    }));
}

export const poolEmployee = async (data: any) => {
    await fetchPool(User.Employee, data, true);
}