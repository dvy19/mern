import api from '../api/axios'
import endpoints from '../api/endpoints'

export const ngoService={

    getAllNGo:async(req,res)=>{

        const data=await api.get(endpoints.GET_ALL_NGO)

        return data.data
    },

    createNgo:async(req,res)=>{

        const data=await api.post(endpoints.CREATE_NGO,req)
        return data.data

    },

    getSingleNgo:async(id)=>{

        const data=await api.get(`${endpoints.SINGLE_NGO(id)}`)
        return data.data

    },

    getAllCampaigns:async(active)=>{

        const res=await api.get(endpoints.GET_ALL_CAMPAIGNS,{
            params: {
                active: active
            }
        })

        return res.data
    },

    getSingleCamp:async(id)=>{

        const data=await api.get(`${endpoints.GET_SINGLE_CAMP(id)}`)

        return data.data

    },

    createJoin:async(id)=>{
        const data=await api.post(`${endpoints.CREATE_JOIN(id)}`)
        return data.data
    }

    
}

