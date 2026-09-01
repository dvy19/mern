

const endpoints={

    LOGIN:"auth/login",
    REGISTER:"auth/register",

    GET_ALL_NGO:"ngo/getAllNgo",

    SINGLE_NGO :(id)=>`ngo/${id}`,

}

export default endpoints