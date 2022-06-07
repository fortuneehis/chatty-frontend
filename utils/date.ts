import { isToday, getHours, getMinutes, intlFormat, isYesterday } from "date-fns"


export const convertToLocaleTime = (datetime: string) => {
    const date = new Date(datetime)

    return isToday(date) ? (
        date.toLocaleTimeString("en-US", {
            timeStyle:"short", 
            second: undefined,
        })
        ) : (
            isYesterday(date)
        ) ? "yesterday" : (
            date.toLocaleDateString("en-US", {
                dateStyle: "medium"
            })
        )
}