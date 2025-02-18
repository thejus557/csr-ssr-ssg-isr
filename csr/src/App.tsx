/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Button from "./components/Button";

const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return response.json();
};

const App: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 min-h-screen">
      {loading ? (
        <p className="text-lg font-semibold mt-10">Fetching products...</p>
      ) : (
        <div className="product-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="relative">
                <a href="#" className="block">
                  {/* <img
                    className="w-full h-60 object-cover rounded-t-lg"
                    width={500}
                    height={300}
                    alt={p.title}
                    src={p.image}
                    
                  /> */}
                  <picture>
                    <source srcSet={p.image} type="image/webp" />
                    <img
                      className="w-full h-60 object-cover rounded-t-lg"
                      width={500}
                      height={300}
                      alt={p.title}
                      src={p.image}
                      fetchPriority="high"
                    />
                  </picture>
                </a>
              </div>
              <div className="p-4">
                <h5 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                  {p.title}
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {p.category}
                </p>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                  {p.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">
                    ₹{p.price}
                  </span>
                  <Button item={p} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
