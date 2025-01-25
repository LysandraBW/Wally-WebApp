import AuthenticateEmployee from "@/services/DB/Procedure/Employee/AuthenticateEmployee";
import { getCookie } from "./cookies/getCookie";
import { goTo } from "./redirect/goTo";

export default async function authenticatedSession(): Promise<string> {
    const sessionID = await getCookie("sessionID");
    const authenticated = await AuthenticateEmployee({sessionID});
    if (!authenticated)
        goTo("/employee/login");
    return sessionID || "";
}