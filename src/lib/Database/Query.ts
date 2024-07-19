export default function Query(e: string, p: {[k: string]: any}): string {
    let statement = "";
    const parameters = Object.keys(p);
    for (let i = 0; i < parameters.length; i++) {
        const parameter = parameters[i];
        const value = p[parameter];

        if (!value)
            continue;

        // Quote Inclusion
        const quote = (typeof value === "string") ? "'" : "";
        statement += `\n\t@${parameter}=${quote}${value}${quote}`;
        
        if (i !== parameters.length - 1)
            statement += ",";
    }

    return e + statement;
}