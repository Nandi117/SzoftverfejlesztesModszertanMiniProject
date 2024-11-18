




export type ActivityType = {
    _id:string,
    description:string,
    referredObjectContent?:string,
    referredObjectId?:string,
    referredObjectCreatorId?:{
        _id:string,
        username:string,
        image?:string
    },
    referredObjectType:string,
    createdAt:Date,
    isActive:boolean

}