import { useReducer, useCallback, useEffect } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

const initialState = {
  user: null,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    case "INIT":
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (storedUser) {
        dispatch({ type: "INIT", payload: JSON.parse(storedUser) });
      } else {
        dispatch({ type: "INIT", payload: null });
      }
    } else {
      dispatch({ type: "INIT", payload: null });
    }
  }, []);

  const login = useCallback(async (email, password, role) => {
    try {
      console.log('Attempting login with:', email, password ? '[PASSWORD]' : 'no password', role);
      const { data } = await api.post("/auth/login", { email, password, role });
      console.log('Login successful:', data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      dispatch({ type: "SET_USER", payload: data.user });

      return { success: true, user: data.user };
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout, loading: state.loading }}>
      {children}
    </AuthContext.Provider>
  );
};
