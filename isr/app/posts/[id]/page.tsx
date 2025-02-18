/* eslint-disable @typescript-eslint/no-explicit-any */
interface Post {
  id: string
  title: string
  content: string
}
export const revalidate = 60;

export async function generateStaticParams() {
  console.log("Generating static params...");
  const posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  );
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

export default async function Page({
  params,
}: any) {
  const post: Post = await fetch(`https://api.vercel.app/blog/${params.id}`, {
    next: { revalidate: 60 }, // ✅ Ensure Next.js caches it properly
  }).then((res) => res.json());

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Fetched at: {new Date().toISOString()}</p>
    </main>
  );
}
