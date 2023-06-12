import { Field } from "./Field";

export interface Teacher {
    _id:string;
    name:string;
    email:string;
    password:string;
    phone:string;
    pricePerHour:number;
    experienceYears:number;
    Latitude:number;
    Longitude:number;
    field:Field;
    averageRating: number;
    pictureUrl: string
    registerationDate: Date;
    Active:boolean;
    AcceptanceDate: Date,
}



