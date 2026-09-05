
import api from "../api/axios"
import endpoints from "../api/endpoints"

const authService={

    register:async(req)=>{
        const res=await api.post(endpoints.REGISTER , req)
        return res.data
    },


    login:async(req)=>{
        const res=await api.post(endpoints.LOGIN , req)
        return res.data
    },

    createUser:async(req,res)=>{

        const data=await api.post(endpoints.CREATE_USER_PROFILE,req)

        return data.data
    },

    
    editUser:async(req)=>{

        const data=await api.put(endpoints.EDIT_USER_PROFILE,req)

        return data.data
    },


    
    deleteUser:async()=>{

        const data=await api.delete(endpoints.DELETE_USER_PROFILE)

        return data.data
    },


    getUser:async()=>{
        
        const data=await api.get(endpoints.GET_USER_PROFILE)

        return data.data
    }
}

export default authService