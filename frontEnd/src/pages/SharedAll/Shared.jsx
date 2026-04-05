// import Header from "../../components/header/Header";
import Nav from "../../components/header/Nav";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
export default function SharedAll() {
    return (
        <>
            <Nav />
            {/* <Header /> */}
            <Outlet />
            <Footer />
        </>
    )
}