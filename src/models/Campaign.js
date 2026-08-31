const mong=require("mongoose")

const createCampaign= new mong.Schema({

        title:String,
        description:String,
        category:String,
        active:Boolean,
        location:String,

        ngo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ngo",
            required: true,
            unique: true
        }

})

const Campaign=mong.model("campaigns" , createCampaign)

module.exports=Campaign