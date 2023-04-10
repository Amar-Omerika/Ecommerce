import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext(null);

// interface MyContextType {
// 	showCart: boolean;
// 	setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
// 	cartItems: any[];
// 	totalPrice: number;
// 	totalQuantities: number;
// 	qty: number;
// 	setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
// 	setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
// 	setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
// }
export const StateContext = ({ children }: any) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
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
		const checkProductInCart = cartItems.find((item) => {
			item._id === product._id;
		});
		//if the product is in the cart update the current product
		if (checkProductInCart) {
			setTotalPrice(
				(prevTotalPrice: number) => prevTotalPrice + product.price * quantity
			);
			setTotalQuantities(
				(prevTotalQuantities: number) => prevTotalQuantities + quantity
			);
		}
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
					// onAdd,
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
