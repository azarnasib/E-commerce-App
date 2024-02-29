export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const addProductToCart = (product) => {
    return({
        type:ADD_ITEM_TO_CART,
        data:product
    })
}

export const removeProductFromCart = (product) => {
    return({
        type:REMOVE_PRODUCT_FROM_CART,
        data:product
    })
}

export const clearCart = () => {
    return({
        type:CLEAR_CART
    })
}

export const increaseQuantity = (productId) => {
    return({
        type:INCREASE_QUANTITY,
        data:productId
    })
}

export const decreaseQuantity = (productId) => {
    return({
        type:DECREASE_QUANTITY,
        data:productId
    })
}