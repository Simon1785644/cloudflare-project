import { useState } from 'react';
import axios from 'axios';
import { IOrderData } from 'src/pages/Cart';

const useCreateOrder = (
    url:string, 
    orderData:IOrderData, 
    active:boolean
) => {
    const [order, setOrder] = useState([]);

    if (active) {
        axios.post(url, orderData).then(res => {
            setOrder(res.data);
            console.log(`訂單:${orderData.orderId}建立中。`)
        }).catch((error:unknown) => {
            if (axios.isAxiosError(error)) {
                console.log(error.response);
            } else if (error instanceof Error) {
                console.log("Failed to build order.", error)
            } else {
                console.log("Unexpected Error occurs when building order.", error)
            }
        });
    }    
    return {order};
}

export default useCreateOrder