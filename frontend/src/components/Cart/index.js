import React from "react";
import {useHistory} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { purchaseFromCart } from "../../store/shoppingCart";
import CartItem from "./CartItem";
import "./Cart.css"




function ShoppingCart(){
    const history = useHistory();
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state)=> state.shoppingCart);
    const userTitle = useSelector((state)=> state.session.user.username)
    // console.log("cart", Object.values(shoppingCart))
    const cart = Object.values(shoppingCart);

    // console.log("cart", cart)

    // Sets the Total Amount
    let total =0.00;
    cart.forEach((item)=>{
        total += parseFloat(item.price)
    })
    const totalPrice = total.toFixed(2)

    // console.log("total", totalPrice);


    const purchaseTheCart = async()=>{
         await dispatch(purchaseFromCart())
         alert("Order has been Placed")
         history.push('/')
         return
    }


    return(
        <div className="cart-placement">
            <div className="cart-container">
                <h1>{userTitle}'s Cart</h1>
                {cart.map((item)=>(
                    <CartItem item={item} key={item.id} />
                ))}
            </div>
            <div className="cart-info">
                <h2>{ totalPrice >0 ? `Total Amount: $${totalPrice}`: 'Total Amount: $0.00' }</h2>
                {totalPrice> 0 ? <button className="cart-purchase-button" onClick={purchaseTheCart} >Purchase</button> : null }
            </div>
        </div>
    )


}


export default ShoppingCart;
