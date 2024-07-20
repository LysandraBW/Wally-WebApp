import sql, { ConnectionPool } from "mssql";
import { AuthenticateLogin, AuthenticateLookup } from "./Export";

// Environment Variables
const DB =      process.env.DB || "";
const DB_C1 =   process.env.C1 || "";
const DB_C2 =   process.env.C2 || "";
const DB_D1 =   process.env.D1 || "";
const DB_D2 =   process.env.D2 || "";
const DB_HOST = process.env.DB_HOST || "";

// Pool Storage
export enum User { Employee, Customer, Default };
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

// Stores Authenticated Employee
let employee: ConnectionPool | null = null;

// Referring To
// npmjs.com/package/mssql#connections-1
export const fetchPool = async (user: User, data: {[k: string]: any} = {}) => {
    if (user === User.Employee) {
        // We assume that we're dealing with an authenticated employee.
        // Only an employee could get this far, as you would need
        // a username and password for anything of substance
        // to be stored in pools[User.Employee]. Moreover,
        // the query shouldn't run successfully for procedures
        // that mutate data.
        if (!data.has('Username') || !data.has('Password')) {
            return pools.get(User.Employee);
        }
        
        const authenticated = await AuthenticateLogin({
            Username: data.Username || "",
            Password: data.Password || ""
        }, User.Default);

        // Employee Failed Authentication
        if (!authenticated)
            return pools.get(User.Default);

        // Make and Return Pool
        const pool = new sql.ConnectionPool(config(data.Username, data.Password));
        const close = pool.close.bind(pool);
        pool.close = (...args: any[]) => {
            pools.delete(data.Username);
            return close(...(args as []));
        }

        pools.set(User.Employee, pool.connect());
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