import api from '../api/axios'
import endpoints from '../api/endpoints'

export const ngoService={

    getAllNGo:async(req,res)=>{

        const data=await api.get(endpoints.GET_ALL_NGO)

        return data.data
    }
}

