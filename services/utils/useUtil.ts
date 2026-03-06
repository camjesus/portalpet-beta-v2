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
    if(date)
    {
        return date?.getHours() + ":" + (date?.getMinutes() >= 10 ? date?.getMinutes() : "0"+ date?.getMinutes()) ;
    }
    return "";
}

export function capitalize(value:string)
{
    return value.substring(0,1).toUpperCase() + value.substring(1,value.length);
}

export function formatURL(url:string)
{
    console.log(url.replace("petImages/", "petImages%2F"))
    return url.replace("petImages/", "petImages%2F");
}