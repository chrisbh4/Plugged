// import { csrfFetch } from "./csrf";
// import { useDispatch } from "react-redux";

const LOAD_CART = 'shoppingCart/LOAD_CART';
const ADD_TO_CART = 'shoppingCart/ADD_TO_CART';
const REMOVE_FROM_CART = 'shoppingCart/REMOVE_FROM_CART';

export const loadCart = (cart) =>({
    type:LOAD_CART,
    cart
})


// const addToCart = (shoe) =>({
//     type: ADD_TO_CART,
//     shoe
// })


const removeFromCart = (shoeId) => ({
type:REMOVE_FROM_CART,
    shoeId
})



export const addShoeToCart = (shoe , cart) => async(dispatch)=>{
    if(shoe){

        if( shoe.id === cart[shoe.id]){
            return
        }else{
            cart[shoe.id] = {shoeId: shoe.id, title:shoe.title , price:shoe.price}
        }
         dispatch(loadCart(cart))
        //  loadCart(cart)
         return
    }else{
        return "cannot find shoe for cart"
    }
}

// export const addShoeToCart = (shoe, cart) => {
//     const dispatch = useDispatch()
//     return async function() {
//         if (shoe.id in cart) {
//             return
//         } else {
//             cart[shoe.id] = { shoeId: shoe.id, title:shoe.title, price: shoe.price }
//         }
//         await dispatch(loadCart(cart));
//         // saveCart(cart)
//         return
//     }
// }


export const removeShoeFromCart = (shoeId, cart ) => async (dispatch)=>{
    if( cart[shoeId]){
        await dispatch(removeFromCart(shoeId))
        delete cart[shoeId]
        return
    }
    await dispatch(loadCart(cart))
    return
}

const initlaState = {};

function reducer ( state=initlaState , action){
    switch(action.type){
        case LOAD_CART:
            return {...state, ...action.cart}
        case ADD_TO_CART:
            state[action.shoe.id] = action.shoe
            return {...state}
        case REMOVE_FROM_CART:
            delete state[action.shoeId]
            return {...state}
        default:
            return state;
    }
}


export default reducer;
