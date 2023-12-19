import axios from 'axios';
import { useEffect, useState } from 'react'

export interface IData {
    id: number;
    gtin: string;
    category: string;
    type?: string;
	title: string;
    image: string;
    creator?: string;
    description: string;
    spec: string;
    stock: number;
    ratings: number;
	listprice: number;
    discount: number;
    popularItem: boolean;
	comments: number;
}

interface IParams {
    data: IData[];
    loading: boolean;
    error: string;
}

/**
 * Use component to handle app.get process.
 * 
 * @param url 
 * @returns data loading error
 * @see ../components/Content
 */
const useFetch = (url:string):IParams => {
    const [data, setData] = useState<Array<IData>>([]); // data temp storage
    const [loading, setLoading] = useState<boolean>(false); // loading status
    const [error, setError] = useState(""); // error status
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (err:unknown) {
                if (err instanceof Error) {
                    if (typeof err == 'string') {
                        setError(err);
                    }
                } else {
                    console.log("Unexpected Error occurs when useFetch proceed", err);
                }
            }
            setLoading(false);
        }
        fetchData();
    },[url])
    return {data, loading, error}
}

export default useFetch