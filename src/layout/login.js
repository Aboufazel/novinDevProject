import {Button, Input} from "@material-tailwind/react";
import useStorage from "../hooks/useStorage";
import {useState} from "react";
import {LoginApi} from "../api/appApi";
import {Navigate, useNavigate} from "react-router-dom";


const Login = () => {


    const navigate = useNavigate()

    const [authInfo, setAuthInfo] = useStorage("auth", {
        userId: "",
        accessToken: "",
        kind: "1"
    })
    const [value, setValue] = useState({
        email: "",
        password: "",
    });


    const manageSubmit = async (e) => {
        e.preventDefault();

        const res = await LoginApi(value.email, value.password).catch();

        if(res.status === 200){
            setAuthInfo({
                userId: res.data.id,
                accessToken: res.data.token,
            })
          navigate('/after')
        }



    }
    return(
        <form onSubmit={manageSubmit} className={"flex flex-col h-full justify-start mt-5 gap-6"}>
            <Input label={"Username"}
                   onChange={(e) => setValue({...value, email: e.target.value})}
                   id={"username"} name={"username"} type={"text"}/>
            <Input label={"Password"}
                   onChange={(e) => setValue({...value,password: e.target.value})}
                   id={"password"} name={"password"} type={"password"}/>

            <Button type={"submit"}>
                Login
            </Button>
        </form>
    )
}


export default Login;