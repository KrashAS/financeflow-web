export function formatDate(
    date: string | number | Date,
    locale: string = "en-US"
): string {
    const d = new Date(date);

    if (isNaN(d.getTime())) return "Invalid date";

    return d.toLocaleDateString(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}
