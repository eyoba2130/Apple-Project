import { Outlet } from "react-router-dom";
import YouTube from "../YouTube/YouTube"
export default function () {
    return (
        <>
            
            <Outlet />
            <YouTube />
           
        </>
    )
}