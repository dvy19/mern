
const {User , UserProfile}=require("../models/User")

const createUserProfile=async(req,res)=>{

    
    try{
        const{name,age,gender,qualification , city}=req.body;

        console.log(req.body);

        const user=req.user.userId;

        console.log(user)

        const exist=await UserProfile.findOne({user})

        if(exist){
            res.status(400).json({
                message: "User Detail already exists"
            })
        }

        const userProfile=await UserProfile.create({
            name,
            city,
            gender,
            qualification,
            user
        })

        res.status(201).json({

            message:"profile created success",
            data:{
                name:userProfile.name,
                user:userProfile.user,
                qualification:userProfile.qualification,
                gender:userProfile.gender,
                city:userProfile.city
            }
        })

    }

    catch(err){
        console.log(`${err}`)
    }

}

module.exports=createUserProfile