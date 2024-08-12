import { ToastContainer } from "react-toastify"
import "./App.css"
import Layout from "./layout/Layout"
import { useContext } from "react"
import { ThemeContext } from "./context/ThemeContext"
import BackToTop from "./components/BackToTop"
import { useLocation } from "react-router-dom"

export default function App() {
  const { isDarkMode } = useContext(ThemeContext)

  const location = useLocation()

  return (
    <>
      <ToastContainer theme={isDarkMode ? "dark" : "light"} position='bottom-right' autoClose={3000} hideProgressBar={true} pauseOnHover={false} closeOnClick rtl />
      <Layout />
      {!(location.pathname === "/users/profile/me" || location.pathname === "/doctors/profile/me" || location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forget-password" || location.pathname === "/reset-password") && <BackToTop />}
    </>
  )
}
