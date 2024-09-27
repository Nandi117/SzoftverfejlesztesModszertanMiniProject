



export const BaseEntity = {
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    isActive:{
        type:Boolean, default:true
    },
    validTo:{
        type:Date,
        default:null
    },
    creatorUserId:{
        type:String,
        require:true,
    }
}