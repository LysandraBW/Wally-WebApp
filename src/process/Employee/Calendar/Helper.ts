const Months: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const Days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const Years: Array<number> = Array.from(Array(25).keys()).map(y => y + 2000);

function getNumberDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}

function sameDay(dateA: Date, dateB: Date) {
    const sameMonth = dateA.getMonth() === dateB.getMonth();
    const sameYear = dateA.getFullYear() === dateB.getFullYear();
    const sameDay = dateA.getDate() === dateB.getDate();
    return sameYear && sameMonth && sameDay;
}