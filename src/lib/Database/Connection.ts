import { AuthenticateLogin, AuthenticateLookup } from "./Export";

const DB = process.env.DB || "";
const DB_HOST = process.env.DB_HOST || "";

export enum ConfigType { Employee, Customer, Default }

export const config = async (configType: ConfigType, data: {[k: string]: any} = {})
: Promise<{
    user:       string,
    password:   string,
    database:   string,
    server:     string,
    options: {
        encrypt: boolean,
        trustServerCertificate: boolean
    },
    pool: {
        idleTimeoutMillis: number
    }
}> => {
    switch (configType) {
        case ConfigType.Employee:
            return await configE({
                Username: data.Username || "", 
                Password: data.Password || ""
            });
        case ConfigType.Customer:
            return await configC({
                AppointmentID: data.AppointmentID || -1,
                FName: data.FName || "",
                LName: data.LName || "",
                Email: data.Email || "",
            });
        default:
            return configD();
    }
}

const configLayout = (
    user: string,
    pass: string
) => {
    const config = {
        user:       user,
        password:   pass,
        database:   DB,
        server:     DB_HOST,
        options: {
            encrypt: false,
            // Changing it to false did not do anything.
            trustServerCertificate: false
        },
        pool: {
            idleTimeoutMillis: 1
        }
    }
    return config;
}

const configE = async (data: {
    Username: string;
    Password: string;
}) => {
    // Check
    if (!(await AuthenticateLogin(ConfigType.Default, data)))
        return configD();
    
    return configLayout(data.Username, data.Password);
}

const configC = async (data: {
    AppointmentID: number;
    FName: string;
    LName: string;
    Email: string;
}) => {
    // Check
    if (!(await AuthenticateLookup(ConfigType.Default, data)))
        return configD();

    return configLayout(process.env.DB_C1 || "", process.env.DB_C2 || "");
}

const configD = () => {
    return configLayout(process.env.DB_D1 || "", process.env.DB_D2 || "");
}