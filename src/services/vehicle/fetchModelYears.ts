export const fetchModelYears = (): Array<[string, string]> => {
    const years: Array<[string, string]> = [];
    for (let i = 2025; i >= 1980; i--)
        years.push([i.toString(), i.toString()]);
    return years;
}