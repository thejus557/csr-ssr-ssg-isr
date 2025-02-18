/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addToCart = async (item: any) => {
  try {
    // Update local storage
    const carts = sessionStorage.getItem("cart");
    const parsed = carts ? JSON.parse(carts) : [];
    const data = [...parsed, {
      productId: item.id, quantity: 1 
    }]
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

    const json = await response.json();
    console.log(json);
    toast.success("Added to cart.");
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Failed to add to cart.");
  }
};

const AddToCart = ({ item }: any) => {
  return (
    <button
      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
      onClick={() => addToCart(item)}
    >
      Add to cart
    </button>
  );
};

export default AddToCart;
