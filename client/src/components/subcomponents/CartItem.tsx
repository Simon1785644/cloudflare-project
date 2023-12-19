import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next';
import './cartItem.scss';
import { CartContext, CartOption } from '../utils/CartContext';

interface IParams {
    obj:{
        gtin: string;
        name: string,
        photo: string,
        price: number,
        quantity: number
    },
    stock:number
}

const CartItem = ({obj, stock}:IParams) => {
    const {t} = useTranslation();
    const {cartItems, dispatch} = useContext(CartContext);
    const [err, setErr] = useState("");
    const regex = /^[0-9\b]+$/; // exclude char.
    const foundItem = cartItems.find(e => obj.gtin === e.gtin);
    const itemPrice = Math.floor(obj.price);
    let qty:number = foundItem?.quantity ? foundItem.quantity : 1;

    const handleEditQTY = (e:React.FormEvent) => {
        e.preventDefault();
        if (foundItem) {
            if (qty <= stock) {
                setErr("");
                dispatch({type:CartOption.UPDATE_CART, payload:[{
                    gtin:foundItem.gtin, name:foundItem.name, 
                    photo:foundItem.photo, price:foundItem.price, 
                    quantity:qty
                }]});
            } else {
                qty = stock;
                setErr(`We're sorry, this item stock:${stock} less than you requested quantity.`);
            }
        } else {
            setErr("Sorry, item doesn't exist.");
        }
    };
    const handleDelete = (e:React.FormEvent) => {
        e.preventDefault();
        if (foundItem) {
            dispatch({type:CartOption.DELETE_ITEM, payload:[{
                gtin:foundItem.gtin, name:foundItem.name, 
                photo:'none', price:0, quantity:0
            }]});
        } else {
            setErr("Sorry, the item that you requested to delete doesn't exist.");
        }
    }

    return (
        <div className='CartItemContainer'>
            {foundItem && 
            <>
                <img className="itemImg" src={obj.photo} alt=""/>
                <div className="itemInfo">
                    <div className="infoTitle">
                        {obj.name}
                    </div>
                    <div className="infoDetail">
                        <span className="infoPrice">
                            $ {itemPrice} TWD
                        </span>
                        <div className="CartOptions">
                            <input type="number" min="0"
                            className='QTYInput'
                            placeholder={`${qty}`}
                            onChange={(e) => {
                                if (e.target.value === '' || regex.test(e.target.value)) {
                                    qty = Number(e.target.value);
                                 }}}
                            />
                            <button className='CartOptionBTN'
                                onClick={handleEditQTY}>
                                {t('Update')}
                            </button>
                            <button className='CartOptionBTN' 
                                onClick={handleDelete}>
                                {t('Delete')}
                            </button>
                        </div>
                        {err && <span style={{color:"red"}}>{err}</span>}
                    </div>
                </div>
            </>
            }
        </div>
    )   
}

export default CartItem;