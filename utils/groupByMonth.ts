type TimeSeriesEntry = {
    createdAt: Date;
    amount: number;
};

type FormattedEntry = {
    month: string;
    value: number;
};

export function groupByMonth(
    data: TimeSeriesEntry[],
    monthsBack: number
): FormattedEntry[] {
    const now = new Date();
    const map = new Map<string, number>();

    for (let i = monthsBack - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const label = date.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
        });
        map.set(label, 0);
    }

    data.forEach(({ amount, createdAt }) => {
        const label = createdAt.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
        });
        if (map.has(label)) {
            map.set(label, map.get(label)! + amount);
        }
    });

    return Array.from(map, ([month, value]) => ({ month, value }));
}
