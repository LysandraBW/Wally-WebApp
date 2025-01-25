import sql from "mssql";
import { authenticateAppointment } from "./procedure/Appointment/Authenticate/Session.js";
import { authenticateEmployee } from "./procedure/Employee/Authenticate/Session.js";

// Environment
const Environment = {
    DB: process.env.DB || "",
    DB_Host: process.env.DB_HOST || "",
    Login: {        
        Standard: [process.env.DB_D1 || "", process.env.DB_D2 || ""],
        Customer: [process.env.DB_C1 || "", process.env.DB_C2 || ""],
        Employee: [process.env.DB_E1 || "", process.env.DB_E2 || ""]
    }
}

// Configuration
const createConfig = (login) => ({
    user:       login[0],
    password:   login[1],
    database:   Environment.DB,
    server:     Environment.DB_Host,
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
});

// Standard Connection Pool
const StandardPool = (new sql.ConnectionPool(createConfig(Environment.Login.Standard))).connect();

export const getStandardPool = async () => {
    return StandardPool;
}

// Customer Connection Pool
const CustomerPool = (new sql.ConnectionPool(createConfig(Environment.Login.Customer))).connect();

export const getCustomerPool = async (sessionID) => {
    const auth = await authenticateAppointment.exec({sessionID});
    if (!auth)
        return StandardPool;
    return CustomerPool;
}

// Employee Connection Pool
const EmployeePool = (new sql.ConnectionPool(createConfig(Environment.Login.Employee))).connect();

export const getEmployeePool = async (sessionID) => {
    const auth = await authenticateEmployee.exec({sessionID});
    if (!auth)
        return StandardPool;
    return EmployeePool;
}