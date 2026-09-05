

const endpoints={

    LOGIN:"auth/login",
    REGISTER:"auth/register",

    GET_ALL_NGO:"ngo/getAllNgo",
    CREATE_NGO:"ngo/create-ngo",

    SINGLE_NGO :(id)=>`ngo/${id}`,
    CREATE_CAMPAIGN:'ngo/create-campaign',

    GET_ALL_CAMPAIGNS:"ngo/getAllCampaigns",
    
    GET_SINGLE_CAMP:(id)=>`ngo/getSingleCampaign/${id}`,

    CREATE_USER_PROFILE:"auth/create-user",
    
    EDIT_USER_PROFILE:"auth/edit-profile",

    DELETE_USER_PROFILE:"auth/delete-profile",


   GET_USER_PROFILE:"auth/get-user",

   CREATE_JOIN:(id)=>`ngo/create-join/${id}`,



}

export default endpoints