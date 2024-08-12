import { createContext, useEffect, useReducer } from "react";

const getInitialState = () => {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  return {
    user: user ? JSON.parse(user) : null,
    role: role || null,
    token: token || null,
  };
};

const initialState = getInitialState();

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        role: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };
    case "USER_UPDATE":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);
  }, [state]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};