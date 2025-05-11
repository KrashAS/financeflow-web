import { DateFilter } from "@/types/filters";

export const DATE_FILTERS: DateFilter[] = [
    { value: "1m", label: "Last 1 Month", months: 1 },
    { value: "3m", label: "Last 3 Months", months: 3 },
    { value: "6m", label: "Last 6 Months", months: 6 },
    { value: "12m", label: "Last 12 Months", months: 12 },
];

export const DATE_FILTER_DEFAULT = DATE_FILTERS[2];
