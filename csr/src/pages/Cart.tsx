/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

const fetchProducts = async () => {
  console.log("Fetching:: cart data");
  const response = await fetch("https://fakestoreapi.com/carts?userId=557", {
    cache: "no-cache",
  });
  return response.json();
};

const fetchUser = async () => {
  console.log("Fetching:: random user");
  const response = await fetch("https://randomuser.me/api/", {
    cache: "no-cache",
  });
  return response.json();
};

const Page: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, userData] = await Promise.all([
          fetchProducts(),
          fetchUser(),
        ]);
        setProducts(productData);
        setUser(userData?.results?.[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 p-4 min-h-screen">
      <p>Count is {products?.[0]?.products?.length ?? 0}</p>
      <p>{user?.email}</p>
    </div>
  );
};

export default Page;