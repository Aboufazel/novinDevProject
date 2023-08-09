import axios from "axios";

const BaseUrl = axios.create({
    baseURL: 'https://reqres.in/'
})

export const LoginApi = (email , password) =>{

    return BaseUrl.post(`api/register` , {
        "email":email , "password":password
    })
}



export const UserDetail = (id) =>{

    return BaseUrl.get(`/api/users/${id}`)
}
