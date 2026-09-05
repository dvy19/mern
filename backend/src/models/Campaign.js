const mong=require("mongoose")

const createCampaign= new mong.Schema({

        title:String,
        description:String,
        category:String,
        active:Boolean,
        location:String,

        ngo:{
            type: mong.Schema.Types.ObjectId,
            ref: "NGO",
            required: true, 
        }

})

const joinRequest=new mong.Schema({
    user: {
        type: mong.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    userProfile:{
        type:mong.Schema.Types.ObjectId,
        ref:"UserProfile",
        required:true

    },

    question: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: true
    },

    aiRating: {
        type: Number
    },

    aiFeedback: {
        type: String
    },

    aiStrengths: [{
        type: String
    }],

    aiImprovements: [{
        type: String
    }],


    campaign: {
        type: mong.Schema.Types.ObjectId,
        ref: "campaigns",
        required: true
    },

    status:{
        type:String,
        enum:["pending", "accepted","rejected"],
        default:"pending"
    }
},
    {
        timestamps:true
    }

)



const Campaign=mong.model("campaigns" , createCampaign)

const JoinRequest = mong.model("JoinRequest", joinRequest);

module.exports = {
    Campaign,
    JoinRequest
};