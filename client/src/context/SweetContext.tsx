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
    fetchSweets: () => Promise<void>;
    searchSweets: (params: {
        name?: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
    }) => Promise<void>;
    searchSweet: Sweet[];
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
    const [searchSweet, setSearchSweet] = useState<Sweet[]>([])


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

    async function searchSweets(params: {
        name?: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
    }) {
        try {
            const query = new URLSearchParams();

            if (params.name) query.append("name", params.name);
            if (params.category) query.append("category", params.category);
            if (params.minPrice !== undefined) query.append("minPrice", params.minPrice.toString());
            if (params.maxPrice !== undefined) query.append("maxPrice", params.maxPrice.toString());

            const { data } = await axios.get(`${server}/api/sweets/search?${query.toString()}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setSearchSweet(data.data);
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

            setSweets((prev) => [...prev, data.data]);
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
                searchSweet,   
                addSweet,
                deleteSweet,    
                updateSweet  
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