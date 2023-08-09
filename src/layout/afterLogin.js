import {Menu, MenuHandler, MenuItem, MenuList} from "@material-tailwind/react";
import UserIcon from "../assets/svg/userIcon";
import {useState} from "react";
import {UserDetail} from "../api/appApi";
import {useQuery} from "@tanstack/react-query";
import Storage from "../storage/storage";
import {useNavigate} from "react-router-dom";
import useStorage from "../hooks/useStorage";


const AfterLogin = () => {

    const [info , setInfo] = useState({first_name:"" , last_name:"" , icon:"" , email:""});

    const storage = Storage()

    async function fetchInfo() {
        const {data} = await UserDetail(storage.userId);

        setInfo({first_name: data.data.first_name ,
            last_name: data.data.last_name ,
            email: data.data.email,
            icon: data.data.avatar})

        return data;

    }

    const {data, error, isLoading, isError} = useQuery({
        queryKey:['userInfo'],
        queryFn:fetchInfo,
        refetchIntervalInBackground:true,
    });


    const navigate = useNavigate();
    const [tokenInfo, setTokenInfo] = useStorage("auth", {
        refreshToken: "",
        accessToken: "",
    });


    const manageLogout = () => {
        localStorage.clear();
        setTokenInfo({
            accessToken: "",
        })
        navigate("/login")
    }


    if (isLoading) {
        return (
            <div className={"hidden xl:flex xl:flex-col items-start gap-sp-24 w-full"}>
                <div className={"w-[300px] h-[80px] bg-primary-100 animate-pulse rounded-[12px]"}></div>

            </div>
        )
    }


    if (isError) {
        return 'An error has occurred: ' + error.message
    }



    console.log(info , data , "info , data")


    return(
        <div className={"flex flex-col w-full"}>
            <div className={"flex flex-row items-center px-3 gap-3 border-black border-b pb-3 w-full"}>
                <Menu>
                    <MenuHandler>
                        <button className={"flex flex-row items-center justify-center w-[45px] h-[45px]"}>
                            <img src={info.icon} alt={info.first_name} className={" rounded-full"}/>
                        </button>
                    </MenuHandler>
                    <MenuList className={"font-[Estedad] font-medium"}>
                        <MenuItem onClick={manageLogout}>
                            خروج از حساب
                        </MenuItem>
                    </MenuList>
                </Menu>
                {
                    isLoading ? "...loading" : <p>{info.first_name + info.last_name}</p>
                }

                {
                    isLoading ? "...loading" : <p className={"text-blue-800"}>{info.email}</p>
                }
            </div>
        </div>
    )
}


export default AfterLogin;