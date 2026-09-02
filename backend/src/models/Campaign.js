const mong=require("mongoose")

const createCampaign= new mong.Schema({

        title:String,
        description:String,
        category:String,
        active:Boolean,
        location:String,

        ngo:{
            type: mong.Schema.Types.ObjectId,
            ref: "Ngo",
            required: true, 
        }

})

const joinRequest=new mong.Schema({
    user: {
        type: mong.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    campaign: {
        type: mong.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    },

    status:{
        type:String,
        enum:["pending", "accepted","rejected"],
        default:"pending"
    }
},
    {
        timestamp:true
    }

)

const Campaign=mong.model("campaigns" , createCampaign)

const JoinRequest=mong.model('joinReq',joinRequest)

module.exports={Campaign , JoinRequest}