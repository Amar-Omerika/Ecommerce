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
	let foundProduct: any;
	let foundIndex: number;
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
		setQty(1);
		toast.success(`${quantity} ${product.name} added to the cart`);
	};

	//reference
	// const toggleCartItemQuanitity = (id: any, value: any) => {
	// 	foundProduct = cartItems.find((item: any) => item._id === id);
	// 	index = cartItems.findIndex((product: any) => product._id === id);
	// 	const newCartItems = cartItems.filter((item: any) => item._id !== id);

	// 	if (value === "inc") {
	// 		setCartItems([
	// 			...newCartItems,
	// 			{ ...foundProduct, quantity: foundProduct.quantity + 1 },
	// 		]);
	// 		setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
	// 		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
	// 	} else if (value === "dec") {
	// 		if (foundProduct.quantity > 1) {
	// 			setCartItems([
	// 				...newCartItems,
	// 				{ ...foundProduct, quantity: foundProduct.quantity - 1 },
	// 			]);
	// 			setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
	// 			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
	// 		}
	// 	}
	// };
	const toggleCartItemQuanitity = (id: any, value: any) => {
		foundIndex = cartItems.findIndex((item: any) => item._id === id);
		foundProduct = cartItems[foundIndex];

		if (value === "inc") {
			const updatedProduct = {
				...foundProduct,
				quantity: foundProduct.quantity + 1,
			};
			const updatedCartItems = [...cartItems];
			updatedCartItems[foundIndex] = updatedProduct;

			setCartItems(updatedCartItems);
			setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
		} else if (value === "dec") {
			if (foundProduct.quantity > 1) {
				const updatedProduct = {
					...foundProduct,
					quantity: foundProduct.quantity - 1,
				};
				const updatedCartItems = [...cartItems];
				updatedCartItems[foundIndex] = updatedProduct;

				setCartItems(updatedCartItems);
				setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
				setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
			}
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
					onAdd,
					toggleCartItemQuanitity,
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
