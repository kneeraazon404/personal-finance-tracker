export function toDateInputValue(date: unknown) {
    if (!date) {
        return "";
    }
    const value = date instanceof Date ? date : new Date(String(date));
    if (Number.isNaN(value.getTime())) {
        return "";
    }
    const timezoneOffset = value.getTimezoneOffset() * 60000;
    const local = new Date(value.getTime() - timezoneOffset);
    return local.toISOString().slice(0, 10);
}
