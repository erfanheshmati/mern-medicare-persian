import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export default function ProtectedRouter({ children, allowedRoles }) {

    const { token, role } = useContext(AuthContext)

    const isAllowed = allowedRoles.includes(role)
    const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />

    return accessibleRoute
}
