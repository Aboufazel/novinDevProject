import {Menu, MenuHandler, MenuItem, MenuList, Spinner} from "@material-tailwind/react";
import {UserDetail} from "../api/appApi";
import {useQuery} from "@tanstack/react-query";
import Storage from "../storage/storage";
import {useNavigate} from "react-router-dom";
import useStorage from "../hooks/useStorage";
import UsersCard from "../components/usersCard";


const AfterLogin = () => {

    const storage = Storage()

    async function fetchInfo() {
        const {data} = await UserDetail(storage.userId);

        return data;

    }

    const {data, error, isLoading, isError} = useQuery({
        queryKey:['userInfo'],
        queryFn:fetchInfo,
        refetchIntervalInBackground:true,
    });


    const navigate = useNavigate();
    const [tokenInfo, setTokenInfo] = useStorage("auth", {
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
            <Spinner className="h-10 w-10" />
        )
    }


    if (isError) {
        return 'An error has occurred: ' + error.message
    }


    return(
        <div className={"flex flex-col w-full"}>
            <div className={"flex flex-row items-center px-3 gap-3 border-black border-b pb-3 w-full"}>
                <Menu>
                    <MenuHandler>
                        <button className={"flex flex-row items-center justify-center w-[45px] h-[45px]"}>
                            <img src={data.data.avatar} alt={data.data.first_name} className={" rounded-full"}/>
                        </button>
                    </MenuHandler>
                    <MenuList className={"font-[Estedad] font-medium"}>
                        <MenuItem onClick={manageLogout}>
                            Log out
                        </MenuItem>
                    </MenuList>
                </Menu>
                {
                    isLoading ? "...loading" : <p>{data.data.first_name + data.data.last_name}</p>
                }

                {
                    isLoading ? "...loading" : <p className={"text-blue-800"}>{data.data.email}</p>
                }
            </div>

            <UsersCard/>
        </div>
    )
}


export default AfterLogin;