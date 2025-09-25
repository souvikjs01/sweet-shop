import React, { 
    createContext, 
    useContext, 
    useEffect, 
    useState 
} from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import type { User } from "../lib/types";


// user server url: 
const server = "http://localhost:8000"; 

interface UserContextType {
    user: User | null;
    isAuth: boolean;
    loginUser: (
        email: string,
        password: string,
        navigate: (path: string) => void
    ) => Promise<void>;
    registerUser: (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        navigate: (path: string) => void
    ) => Promise<void>;
    logout: () => Promise<void>
}
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: React.ReactNode;
}


export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    const [ user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true)
        }
    }, []);

    async function registerUser(firstName: string, lastName: string, email: string, password: string, navigate: (path: string) => void) {
        try {
            const { data } = await axios.post(`${server}/api/auth/register`, {
                firstName,
                lastName,
                email,
                password,
            })

            toast.success("successfully registered")
            localStorage.setItem("token", data.token)
            setUser(data.data)
            setIsAuth(true)
            navigate("/home")
            
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    async function loginUser(email: string, password: string, navigate: (path: string) => void) {
        try {
            const { data } = await axios.post(`${server}/api/auth/login`, {
                email,
                password,
            })

            toast.success("login successful")
            localStorage.setItem("token", data.token)
            setUser(data.data)
            setIsAuth(true)
            navigate("/home")
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    async function logout() {
        localStorage.clear();
        setUser(null);
        setIsAuth(false);

        toast.success("User logged out");
    }

    return (
        <UserContext.Provider
            value={{ 
                user,
                isAuth,
                loginUser,
                registerUser,
                logout,
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    )
}

export const useUserData = (): UserContextType => {
    const context = useContext(UserContext);
    if(!context) {
        throw new Error("useUserData must be used within a userprovider")
    }
    return context;
}