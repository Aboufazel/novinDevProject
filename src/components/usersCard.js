import {UserLists} from "../api/appApi";
import {useQuery} from "@tanstack/react-query";
import {useId} from "react";
import {Spinner} from "@material-tailwind/react";


const UsersCard = () => {


    const uniqId = useId()
    async function fetchInfo() {
        const {data} = await UserLists();
        return data;

    }

    const {data, error, isLoading, isError} = useQuery({
        queryKey:['userLists'],
        queryFn:fetchInfo,
        refetchIntervalInBackground:true,
    });

    if (isLoading) {
        return (
            <Spinner className="h-10 w-10" />
        )
    }


    if (isError) {
        return 'An error has occurred: ' + error.message
    }

    return(
        <div className={"flex flex-col w-full max-h-[500px] overflow-y-scroll"}>
            {
                data.data.map(item => (
                    <div key={uniqId + item.id} className={"flex flex-row items-center bg-gray-300 w-full my-3 h-[120px] rounded-[15px]"}>
                        <img src={item.avatar} alt={"user image"} className={"w-[90px] shadow-sm shadow-amber-400  rounded-[15px]"}/>
                        <div className={"flex flex-col w-2/3"}>
                            <p>{item.first_name + item.last_name}</p>
                            <p>{item.email}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


export default UsersCard;