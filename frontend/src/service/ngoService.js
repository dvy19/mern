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

    createCampaign:async(req,res)=>{

        const data=await api.post(endpoints.CREATE_CAMPAIGN,req)
        return data.data

    },
    getSingleNgo:async(id)=>{

        const data=await api.get(`${endpoints.SINGLE_NGO(id)}`)
        return data.data

    },

    getAllCampaigns:async(active , ngoId , page=1, limit=5)=>{

        const res=await api.get(endpoints.GET_ALL_CAMPAIGNS,{
            params: {
                active: active,
                ngoId ,
                page,limit
            }
        })

        return res.data
    },

    acceptJoin:async(requestId )=>{

        const data=await api.post(`${endpoints.ACCEPT_JOIN(requestId)}`)

        return data.data

    },

    getAcceptedReq:async(ngoId)=>{
        const data=await api.post(`${endpoints.GET_ACCEPTED_REQ(ngoId)}`)

        return data.data
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

