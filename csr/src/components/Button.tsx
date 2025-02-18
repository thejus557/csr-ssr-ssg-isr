import React from "react";
import toast from "react-hot-toast";

interface Product {
  id: number;
}

const addToCart = async (item: Product) => {
  try {
    // Update session storage
    const carts = sessionStorage.getItem("cart");
    const parsed: Product[] = carts ? JSON.parse(carts) : [];
    const data = [...parsed, { productId: item.id, quantity: 1 }];
    sessionStorage.setItem("cart", JSON.stringify(data));

    // Send API request
    const response = await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 557,
        date: "2020-02-03",
        products: data,
      }),
    });

    if (!response.ok) throw new Error("Failed to add item to cart");

    toast.success("Added to cart.");
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add to cart.");
  }
};

interface ButtonProps {
  item: Product;
}

const Button: React.FC<ButtonProps> = ({ item }) => {
  return (
    <button
      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
      onClick={() => addToCart(item)}
    >
      Add to cart
    </button>
  );
};

export default Button;