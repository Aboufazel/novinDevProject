import {Outlet} from "react-router-dom";


const IndexLayout = () =>{

    return(
        <div className={"flex items-center bg-red justify-center w-full text-black"}>
            <div className={"max-w-[500px]"}>
                main layout
                <Outlet/>
            </div>
        </div>
    )
}



export default IndexLayout;