import axios from 'axios';

export interface IData {
    itemID:string,
    diff:number
}

export interface IArrProps {
    gtin:string,
    quantity:number
}

export async function setStockData(arr:IData[], userId:string) {
    let result:boolean = false;

    try {
        if (userId) {
            for (let i=0;i<arr.length;i++) {
                await axios.put(`/products/${userId}/stock`, 
                    {stock:arr[i].diff, gtin:arr[i].itemID});
            };
            result = true;
        }
        console.log(Object.keys(arr));
    } catch (err:unknown) {
        if (err instanceof Error) {
            console.log("Failed to update item stock.", err);
        } else {
            console.log("Unexpected Error occurs when requested update item stock.", err);
        }
    }
    return result;
}

export async function useFetchItem(arr:IArrProps[]) {
    let itemID:string;
    let foundItem;
    let diff:number;
    let reqItemStockArray:IData[] = [];
    let errMes:string = '';
    let result:boolean = true;

    // Iterating all items of cart to check items stock
    for (let i=0;i <= arr.length;i++) {
        itemID = arr[i].gtin;
        foundItem = await axios.get(`/products/${itemID}`);
        if (foundItem) {
            diff = foundItem.data.stock - arr[i].quantity;
            if (diff >= 0) {
                reqItemStockArray.push({itemID ,diff});
            } else {
                reqItemStockArray.length = 0;
                errMes = `品項碼${itemID}之商品已完售。`;
                result = false;
                break;
            }
        } else {
            reqItemStockArray.length = 0;
            errMes = `品項碼:${itemID}沒有資料！`;
            result = false;
            break;
        }
    }
    return {result, reqItemStockArray, errMes};
}