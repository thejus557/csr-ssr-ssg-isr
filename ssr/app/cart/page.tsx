const fetchProducts = async () => {
  console.log('Fetching:: cart data')
  const response = await fetch("https://fakestoreapi.com/carts?userId=557", {
    cache: "no-cache",
  });
  return response.json();
};

const fetchUser = async () => {
  console.log('Fetching:: random user')
  const response = await fetch("https://randomuser.me/api/", {
    cache: "no-cache",
  });
  return response.json();
};

export default async function Page() {
  // Fetch data concurrently
  const [products, user] = await Promise.all([fetchProducts(), fetchUser()]);
  console.log('rendered:: cart ::'+ user?.results?.[0]?.email);
  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 p-4 min-h-screen">
      <p>Count is {products?.[0]?.products?.length ?? 0}</p>
      <p>{user?.results?.[0]?.email}</p>
    </div>
  );
}
