import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next';
import TopNav from 'src/components/TopNav';
import CartItem from 'src/components/subcomponents/CartItem';
import './cart.scss';
import { CartContext } from 'src/components/utils/CartContext';
import { LoginContext } from 'src/components/contexts/LoginContext';
import useCreateOrder from 'src/components/utils/useCreateOrder';
import { IArrProps, IData, setStockData, useFetchItem } from 'src/components/utils/checkUnvailItem';
import { useLocation, useNavigate } from 'react-router-dom';
import generateId from 'src/components/utils/IdGenerator';

export interface IState {
    gtin:string;
    name:string;
    photo?:string;
    price:number;
    quantity:number;
}

type option = {
    creditCard: boolean;
    giftCardPoint: number;
    delivery: string;
}

export interface IOrderData {
    userId: string,
    orderId: string,
    purchaseItems: IArrProps[],
    totalPrice: number,
    status: string,
    options: option[],
    note: string
}

interface IParams {
    data: IData[];
    error: string;
}

function PriceCalculator(items:IState[]) {
    return items.reduce((count, item) => 
        count = count + item.price, 0);
}

function ItemStatus (arr:IArrProps[]):IParams {
    const [data, setData] = useState<IData[]>([]);
    const [error, setError] = useState("");

    useFetchItem(arr).then(r => {
        if (r.result) {setData(r.reqItemStockArray);
        } else { setError(r.errMes); }
        console.log('chkItemStock actived.');
    }).catch((err:unknown) => {
        if (err instanceof Error) {
            if (typeof err == 'string') {
                setError(err);
            }
        } else {
            console.log("Unexpected Error", err);
        }
    });
    return {data, error};
}

function CartToPurchaseItems(cartItems:IState[]):IArrProps[] {
    let arr:IArrProps[] = [];
    let gtin:string = '';
    let quantity:number = 0;

    cartItems.forEach(item => {
        gtin = item.gtin;
        quantity = item.quantity;
        arr.push({gtin, quantity})
    })
    return arr;
}

/**
 * Shopping Cart process.
 * 
 */
const Cart = () => {
    const [errMes, setErrMes] = useState("");
    const {t} = useTranslation();
    const locData = useLocation();
    const stock = locData.state?.stockStatus;
    const {cartItems} = useContext(CartContext);
    const {user} = useContext(LoginContext);
    const leng:number = cartItems.length;
    const stringItem:string = (leng === 1 && `${leng} item`)
     || `${leng} items`;
    /** For orderData required */
    const userID:string = user.id;
    // [{gtin, ItemQTY}...]
    const itemArr = CartToPurchaseItems(cartItems);
    const totalPrice = PriceCalculator(cartItems);

    /** build order */
    // orderData - storing props that order required.
    // useCreateOrder - Return order information that build success.
    // handleSubmit - try build new order
    const [orderData, setOrderData] = useState<IOrderData>({
        userId: userID,
        orderId: generateId(32), // 32 char
        purchaseItems: [],
        totalPrice: totalPrice,
        status: "pending",
        options: [{creditCard:true, giftCardPoint:0, 
            delivery:"free delivery"}],
        note:""
    });
    /** Check If anything out of stock or doesn't exist */
    const {data, error} = ItemStatus(itemArr);
    /** use hook to create order */
    // Avoid auto actived when rendering components.
    const [active, setActive] = useState(false);
    const {order} = useCreateOrder("/order", orderData, active);
    const navigator = useNavigate();
    const handleSubmit = () => {
        try {
            if (user) {
                setOrderData((item) => ({...item, purchaseItems:itemArr}));
                if (window.confirm('Checkout Now?')) { 
                    setActive(true);
                    const objData = Object.keys(order);
                    if (typeof objData === 'string') {
                        setErrMes(objData);
                    } 
                    // Update stock must be after order be created.
                    setStockData(data, userID);
                    console.log("setting stock data...");
                    setTimeout(() => navigator("/"), 3000);
                }
            } else {
                setErrMes("找不到使用者資料，請重新登入後再試。");
            }
        } catch (err:unknown) {
            setErrMes(error);
            if (err instanceof Error) {
                console.log("上傳失敗。");
            } else {
                console.log("Unexpected Error", err)
            }
        }
    };

    return (
        <div className='CartContainer'>
            <TopNav/>
            <div className='CartError'>
                <span><p style={{fontWeight:"800"}}>Message</p>
                    Dear customer, we're appreciated that you choose our site.<br/>
                    If you have any questions, please use help service.
                </span>
                {active && <span style={{color:"green"}}>Order has created</span>}
                {errMes && <span style={{color:"red"}}>{errMes}</span>}
            </div>
            <div className='CartWrapper'>
                <div className='CartHeader'>
                    <h3>{t('MyShoppingCart')}</h3>
                    <hr/>
                </div>
                <div className='CartItemList'>
                    {(cartItems.length === 0) ? <>Your Cart is empty.</>
                    : cartItems.map((item, index)=>
                        <CartItem key={index} obj={item} 
                        stock={stock}/>
                    )}
                    <hr/>
                    <div className='CartAccount'>
                        <button type="submit" 
                            className='CheckOutBTN'
                            onClick={handleSubmit}
                            disabled={cartItems.length === 0 || active}>
                            {t('CheckOut')}
                        </button>
                        {t('SubTotal')} ({stringItem}) : {totalPrice} TWD
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart