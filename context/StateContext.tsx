import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext(null);

export const StateContext = ({ children }: any) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState<any>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	};
	const decreaseQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	};
	const onAdd = (product: any, quantity: number) => {
		//checking if the product is in the cart
		const checkProductInCart = cartItems.find((item: any) => {
			item._id === product._id;
		});
		setTotalPrice(
			(prevTotalPrice: number) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities(
			(prevTotalQuantities: number) => prevTotalQuantities + quantity
		);
		//if the product is in the cart update the current product
		if (checkProductInCart) {
			const updatedCartItem = cartItems.map((cartProduct: any) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});
			setCartItems(updatedCartItem);
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${quantity} ${product.name} added to the cart`);
	};
	return (
		<Context.Provider
			value={
				{
					showCart,
					setShowCart,
					cartItems,
					totalPrice,
					totalQuantities,
					qty,
					increaseQty,
					decreaseQty,
					onAdd,
					// toggleCartItemQuanitity,
					// onRemove,
					setCartItems,
					setTotalPrice,
					setTotalQuantities,
				} as any
			}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
