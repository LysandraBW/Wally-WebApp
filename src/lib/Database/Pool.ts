'use server';
import sql, { ConnectionPool } from 'mssql';
import { AuthenticateAppointmentSession, AuthenticateEmployeeSession } from './Export';
import { User } from './User';

// Environment Variables
const DB        =   process.env.DB      || '';
const DB_C1     =   process.env.DB_C1   || '';
const DB_C2     =   process.env.DB_C2   || '';
const DB_D1     =   process.env.DB_D1   || '';
const DB_D2     =   process.env.DB_D2   || '';
const DB_E1     =   process.env.DB_E1   || '';
const DB_E2     =   process.env.DB_E2   || '';
const DB_HOST   =   process.env.DB_HOST || '';

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

const StandardConfig: ConnectionPool = new sql.ConnectionPool(config(DB_D1, DB_D2));
pools.set(User.Standard, StandardConfig.connect());

const CustomerConfig: ConnectionPool = new sql.ConnectionPool(config(DB_C1, DB_C2));
pools.set(User.Customer, CustomerConfig.connect());

const EmployeeConfig: ConnectionPool = new sql.ConnectionPool(config(DB_E1, DB_E2));
pools.set(User.Employee, EmployeeConfig.connect());

// Referring To
// npmjs.com/package/mssql#connections-1
export const fetchPool = async (user: User, data: {[k: string]: any} = {}) => {
    if (user === User.Employee) {
        const authenticated = await AuthenticateEmployeeSession({
            SessionID: data.SessionID
        }, User.Standard);

        // Employee Failed Authentication
        if (!authenticated)
            return pools.get(User.Standard);

        return pools.get(User.Employee);
    }
    else if (user === User.Customer) {
        const authenticated = await AuthenticateAppointmentSession({
            SessionID: data.SessionID
        }, User.Standard);

        // Customer Failed Authentication
        if (!authenticated)
            return pools.get(User.Standard);

        return pools.get(User.Customer);
    }
    else {
        return pools.get(User.Standard);
    }
}

export const drainPool = async () => {
    Promise.all(Array.from(pools.values()).map(async (connect) => {
        return connect.then(async (pool) => await pool.close());
    }));
}