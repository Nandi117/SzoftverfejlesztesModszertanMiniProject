




export type CommentType = {
    _id:string,
    content:string,
    creatorUserId:{
        _id:string,
        username:string,
    }
}