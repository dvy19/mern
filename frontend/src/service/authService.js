
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
    }
}

export default authService