import { Timestamp } from "firebase/firestore";

export function formatTimestampToDate(timestamp:Timestamp|undefined)
{
    const time = timestamp?.toJSON();
    if(time){
        const ts = time ? (time.seconds + time.nanoseconds / 1000000000) * 1000 : 0;
        const date = new Date(ts);
        return date;
    }
}

export function getTime(timestamp:Timestamp|undefined)
{
    const date = formatTimestampToDate(timestamp);
    return date?.getHours() + ":" + date?.getMinutes();
}

export function capitalize(value:string)
{
    return value.substring(0,1).toUpperCase() + value.substring(1,value.length);
}