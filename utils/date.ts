import { isToday, getHours, getMinutes, intlFormat, isYesterday } from "date-fns"


export const convertToLocaleTime = (datetime: string) => {
    const date = new Date(datetime)

    return isToday(date) ? (
        `${getHours(date)}:${getMinutes(date)}`
        ) : (
            isYesterday(date)
        ) ? "yesterday" : (
            intlFormat(date)
        )
}