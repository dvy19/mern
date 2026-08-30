
const Ngo=require("../models/Ngo")

const createNgo=async(req,res)=>{

    try{

        console.log(req.body)
        const{name, title, category, bio, established}= req.body

        const user=req.user.userId;
        console.log(user)

        const existNgo=await Ngo.findOne({user})


        if(existNgo){
            res.status(400).json(
                {
                    message: "Ngo already exists"
                }
            )
        }


        const ngo=await Ngo.create({
            name,
            title,
            established,
            user,
            bio,
            category,
        })


        res.status(201).json({
            message:"Ngo created successfully",
            data: {
                id: ngo._id,
                name: ngo.name,
                title: ngo.title,
                category: ngo.category,
                user: ngo.user,
                bio: ngo.bio,
                established: ngo.established
            }
    })
    }
    catch(err){
        console.log(`${err}`)

        res.status(500).json({
            message: "Server error"
        });

    }
}


// an object is exported
module.exports={createNgo}