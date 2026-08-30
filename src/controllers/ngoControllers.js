
const Ngo=require("../models/Ngo")

const cloudinary = require("../config/cloudinary");

const createNgo=async(req,res)=>{

    try{

        console.log(req.body)
        const{name, title, category, bio, established}= req.body

        const user=req.user.userId;
        console.log(user)

        let logoUrl = null;

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "ngo_logos"
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                uploadStream.end(req.file.buffer);
            });

            logoUrl = result.secure_url;
        }

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
            logo:logoUrl
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

// get all NGOs using .find

const getAllNgos = async (req, res) => {
    try {


        // /api/ngos?name=helping

        // req.query.name = helping
        const{name,category}=req.query;

        // MongoDB's find() expects a query/filter object.
        let filter={};

        // regex => allows partial matching
        // options => makes it case-insensitive
        if (name) {
            filter.name = {
                $regex: name,
                $options: "i"
            };
        }

        // Filter by category
        // /api/ngos?category=Education
        if (category) {
            filter.category = category;
        }

        // /api/ngos?name=help&category=Education

        const ngos = await Ngo.find(filter);

        res.status(200).json({
            count: ngos.length,
            ngos
        });
    } 
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch NGOs",
            error: error.message
        });
    }
};

// getting particular NGO

const getNgoById = async (req, res) => {
    try {

        // Ngo.find().populate("user")
        // Ngo.findById(req.params.id).populate("user")
        const ngo = await Ngo.findById(req.params.id);

        if (!ngo) {
            return res.status(404).json({
                message: "NGO not found"
            });
        }

        res.status(200).json(ngo);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch NGO",
            error: error.message
        });
    }
};


// an object is exported
module.exports={
    createNgo,
    getAllNgos,
    getNgoById
}