import { ADD_ITEM_TO_CART, CLEAR_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_PRODUCT_FROM_CART } from "../actions/Cart.actions"

const INITIAL_STATE = {
    cartProducts: [],
    cartProductsIds: []
}

export default CartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            let cP = [...state.cartProducts];
            let cartProdIds = [...state.cartProductsIds];
            console.log(action.data.id)
            cartProdIds.push(action.data.id);
            cP.push({
                ...action.data,
                quantity:1
            });
            return {
                ...state,
                cartProducts: cP,
                cartProductsIds: cartProdIds
            }


        case REMOVE_PRODUCT_FROM_CART:

            let cartProds = [...state.cartProducts];
            let cartProdIdsCopy = [...state.cartProductsIds];
            const filteredCartProducts = cartProds.filter(item => item.id != action.data.id);
            const filteredCartProductIds = cartProdIdsCopy.filter(item => item != action.data.id)
            return {
                ...state,
                cartProducts: filteredCartProducts,
                cartProductsIds: filteredCartProductIds
            }

        case CLEAR_CART:
            return {
                ...state,
                cartProducts: [],
                cartProductsIds: []
            }

        case INCREASE_QUANTITY:
            const cartProducts = [...state.cartProducts];
            const productId = action.data;
            const filteredProduct = cartProducts.filter(product => product.id == productId)[0];
            const productIndex = cartProducts.findIndex(product => product.id == productId);
            filteredProduct.quantity = filteredProduct.quantity + 1;
            cartProducts[productIndex] = filteredProduct;
            return {
                ...state,
                cartProducts:cartProducts
            }

            case DECREASE_QUANTITY:
    const cProducts = [...state.cartProducts];
    const pId = action.data;
    const filteredProd = cProducts.find(product => product?.id === pId);

    if (filteredProd) {
        const prodIndex = cProducts.indexOf(filteredProd);

        if (filteredProd.quantity > 1) {
            filteredProd.quantity = filteredProd.quantity - 1;
            cProducts[prodIndex] = filteredProd;
        } else {
            // If quantity is 1, remove the product from the cart
            cProducts.splice(prodIndex, 1);
        }

        return {
            ...state,
            cartProducts: cProducts
        };
    }
    return state; // If the product is not found, return the current state

            

        default: return state;
    }
}