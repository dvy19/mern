

const endpoints={

    LOGIN:"auth/login",
    REGISTER:"auth/register",

    GET_ALL_NGO:"ngo/getAllNgo",

    SINGLE_NGO :(id)=>`ngo/${id}`,

    GET_ALL_CAMPAIGNS:"ngo/getAllCampaigns",
    GET_SINGLE_CAMP:(id)=>`ngo/getSingleCampaign/${id}`,

    CREATE_USER_PROFILE:"auth/create-user",
   GET_USER_PROFILE:"auth/get-user"

}

export default endpoints