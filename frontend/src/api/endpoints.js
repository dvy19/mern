

const endpoints={

    LOGIN:"auth/login",
    REGISTER:"auth/register",

    GET_ALL_NGO:"ngo/getAllNgo",

    SINGLE_NGO :(id)=>`ngo/${id}`,

    GET_ALL_CAMPAIGNS:"ngo/getAllCampaigns",
    GET_SINGLE_CAMP:(id)=>`ngo/getSingleCampaign/${id}`

}

export default endpoints