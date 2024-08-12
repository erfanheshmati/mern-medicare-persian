import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const LogoutContext = createContext();

export const useLogout = () => useContext(LogoutContext);

export const LogoutProvider = ({ children }) => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const triggerLogout = () => {
        setIsLoggedOut(true);
    };

    useEffect(() => {
        if (isLoggedOut) {
            toast.success("از حساب خود خارج شده اید");
            setIsLoggedOut(false); // Reset the state after showing the toast
        }
    }, [isLoggedOut]);

    return (
        <LogoutContext.Provider value={{ triggerLogout }}>
            {children}
        </LogoutContext.Provider>
    );
};