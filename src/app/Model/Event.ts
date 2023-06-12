import { Student } from "./Student";
import { Speaker } from "./Speaker";
export interface Event {
    _id:number;
    title:string;
    eventDate:string;
    mainSpeaker:Speaker;
    otherSpeakers:Speaker[];
    students:Student[]
}