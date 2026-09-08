
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


const activity=new mongSchema(
    {

        title:{
            type:String
        },

        image:{
            type:String
        },

        userId:{
            type:mongoose.Types.Schema.ObjectId,
            required:true,
            ref:"UserProfile"
        },

        reminderAt: {
            type: Date
        },
        reminderSent: {
            type: Boolean,
            default: false
        },
        date:{
            type:Date,
            required:true
        },

    },
    {
        timeStamps:true
    }

);


const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true
    },

    message: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: "activity-reminder"
    },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);


const Event=new mong.model("Event" ,event )

const Activity=mong.model("Activity" , activity)

module.exports=Event
module.exports=Activity

module.exports = Notification;
