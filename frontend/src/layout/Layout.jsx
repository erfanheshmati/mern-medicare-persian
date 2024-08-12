import Header from "../components/Header"
import Footer from "../components/Footer"
import Router from "../routes/Router"
import { useLocation } from "react-router-dom"

export default function Layout() {
    const location = useLocation()

    return (
        <>
            <Header />
            <main>
                <Router />
            </main>
            {!(location.pathname === "/users/profile/me" || location.pathname === "/doctors/profile/me" || location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forget-password" || location.pathname === "/reset-password") && <Footer />}
        </>
    )
}
