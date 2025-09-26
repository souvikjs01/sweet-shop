import React, { 
    createContext, 
    useCallback, 
    useContext,
    useEffect,
    useState 
} from "react";

import axios from "axios";
import type { Sweet } from "../lib/types";
 import toast from "react-hot-toast";

const server = "http://localhost:8000";


interface SweetContextType {
    sweets: Sweet[];
    searchSweetData: Sweet[];
    fetchSweets: () => Promise<void>;
    searchSweets: (name: string) => Promise<void>;
    addSweet: (
        name: string, 
        category: string, 
        price: number, 
        quantity: number,
        userId: string
    ) => void;
    deleteSweet: (id: string) => void;
    updateSweet: (
        id: string, 
        name: string, 
        category: string, 
        price: number, 
        quantity: number
    ) => void;
}

const SweetContext = createContext<SweetContextType | undefined>(undefined)

interface SweetProviderProps {
    children: React.ReactNode
}


export const SweetProvider: React.FC<SweetProviderProps> = ({children}) => {
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [searchSweetData, setSearchSweetData] = useState<Sweet[]>([]);


    const fetchSweets = useCallback(async () => {
        try {
            const { data } = await axios.get(`${server}/api/sweets`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            
            if(data.data.length > 0) {
                setSweets(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }, [])

    async function searchSweets(name: string) {
        try {
            const query = new URLSearchParams();

            if (name) query.append("name", name);

            const { data } = await axios.get(`${server}/api/sweets/search?${query.toString()}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setSearchSweetData(data.data);
        } catch (error) {
            console.error("Error fetching sweets", error);
        }
    }

    async function addSweet(name: string, category: string, price: number, quantity: number, userId: string) {
        try {
            const { data } = await axios.post(`${server}/api/sweets`, {
                name,
                category,
                price,
                quantity,
                userId 
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })

            setSweets((prev) => [...prev, data.data]);
            toast.success("sweet added");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occured")
        }
    }

    async function updateSweet(id: string, name: string, category: string, price: number, quantity: number) {
        try {
            const { data } = await axios.put(`${server}/api/sweets/${id}`, {
                name,
                category,
                price,
                quantity
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })

            const updatedSweet = data.data
            setSweets((prev) => prev.map((sweet) => (sweet.id === id ? updatedSweet : sweet)))
            toast.success("sweet updated");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occured")
        }
    }

    async function deleteSweet(id: string) {
        try {
            await axios.delete(`${server}/api/sweets/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })

            setSweets((prev) => prev.filter((sweet) => sweet.id !== id));
            toast.success("sweet deleted");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occured")
        }
    }

    useEffect(() => {
        fetchSweets()

    }, [])

    return (
        <SweetContext.Provider 
            value={{ 
                sweets,
                fetchSweets,
                searchSweets, 
                searchSweetData, 
                addSweet,
                deleteSweet,    
                updateSweet,
            }}    
        >
            {children}
        </SweetContext.Provider>
    )
}

export const useSweetData = (): SweetContextType => {
    const context = useContext(SweetContext);
    if(!context) {
        throw new Error("useSweetContext must be used within a songProvider");
    }
    return context
}