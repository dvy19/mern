
const mong=require("mongoose")

const event=new mong.Schema({

    ngoId:{
        type:mong.Schema.Types.ObjectId,
        required:true
    },

    title:{
        type:String
    },

    description:{
        type:String
    },

    startTime:{
        type:String
    },

    endTime:{
        type:String
    },

    venue:{
        type:String
    },

    date:{
        type:String
    },

    logo:{
        type:String
    },

    fee:{
        type:Number
    },

})

const Event=new mong.model("Event" ,event )

module.exports=Event