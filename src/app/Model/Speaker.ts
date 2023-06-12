export interface Speaker {
    _id:number;
    username:string;
    email:string;
    password:string;
    address:{
        city:string,
        street:string,
        building:string
    }

}