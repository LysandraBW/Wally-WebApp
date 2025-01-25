import { UNDEFINED_POOL } from "../../../constant.js";
import { getStandardPool } from "../../../connectionPool.js";

export async function selectServices() {
    try {
        const pool = await getStandardPool();
        if (!pool)
            throw UNDEFINED_POOL;

        const output = await pool.request().execute("Info.Services");
        return output.recordset;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}