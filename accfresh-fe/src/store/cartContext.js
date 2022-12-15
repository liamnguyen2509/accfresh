import React, { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    subtractItem: (id) => {},
    updateItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

const defaultCart = {
    items: [],
    totalAmount: 0
}

// state: items (products list), totalAmout
// action: type (Action on cart), item (data push to reducer)
const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const newCartTotalAmount = state.totalAmount + (action.item.quantity * action.item.price);
        
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingItemIndex];

        let newCartItems;
        if (existingItem) {
            const updatedExistingItem = {
                ...existingItem,
                quantity: existingItem.quantity + action.item.quantity
            };

            newCartItems = [...state.items];
            newCartItems[existingItemIndex] = updatedExistingItem;
        } else {
            newCartItems = [...state.items, action.item];
        }

        return {
            items: newCartItems,
            totalAmount: newCartTotalAmount
        }
    }

    if (action.type === "SUBTRACT") {
        const existingItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingItemIndex];

        const newCartTotalAmount = existingItem.quantity <= 1 ? state.totalAmount : state.totalAmount - existingItem.price;

        let newCartItems = [...state.items];
        const updatedExistingItem = {
            ...existingItem,
            quantity: existingItem.quantity <= 1 ? 1 : existingItem.quantity - 1
        };
        newCartItems[existingItemIndex] = updatedExistingItem;

        return {
            items: newCartItems,
            totalAmount: newCartTotalAmount
        }
    }

    if (action.type === "UPDATE") {
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingItemIndex];

        let newCartItems;
        if (existingItem) {
            const updatedExistingItem = {
                ...existingItem,
                quantity: action.item.quantity
            };

            newCartItems = [...state.items];
            newCartItems[existingItemIndex] = updatedExistingItem;
        } else {
            newCartItems = [...state.items, action.item];
        }

        let newCartTotalAmount = 0;
        newCartItems.forEach(item => {
            const itemAmount = item.quantity * item.price;
            newCartTotalAmount += itemAmount;
        });

        return {
            items: newCartItems,
            totalAmount: newCartTotalAmount
        }
    }

    if (action.type === "REMOVE") {
        const removingItemIndex = state.items.findIndex(item => item.id === action.id);
        const removingItem = state.items[removingItemIndex];

        const newCartTotalAmount = state.totalAmount - (removingItem.quantity * removingItem.price);
        return {
            items: state.items.filter(item => item.id !== removingItem.id),
            totalAmount: newCartTotalAmount
        }
    }

    if (action.type === "CLEAR") {
        return defaultCart;
    }
    return defaultCart;
}

export const CartContextProvider = ({ children }) => {
    const [cart, dispatchCartAction] = useReducer(cartReducer, defaultCart);

    const onAddItemHandler = item => {
        dispatchCartAction({ type: "ADD", item });
    };

    const onSubtractItemHandler = id => {
        dispatchCartAction({ type: "SUBTRACT", id });
    }

    const onUpdateItemHandler = item => {
        dispatchCartAction({ type: "UPDATE", item });
    }

    const onRemoveItemHandler = id => {
        dispatchCartAction({ type: "REMOVE", id });
    };

    const onClearCartHandler = () => {
        dispatchCartAction({ type: "CLEAR" });
    };

    return (
        <CartContext.Provider
            value={{
                items: cart.items,
                totalAmount: cart.totalAmount,
                addItem: onAddItemHandler,
                subtractItem: onSubtractItemHandler,
                updateItem: onUpdateItemHandler,
                removeItem: onRemoveItemHandler,
                clearCart: onClearCartHandler
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;