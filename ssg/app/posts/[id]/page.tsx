/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return null;
  return res.json();
}

async function getAllPostIds() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return posts.map((post: any) => post.id.toString());
}

export async function generateStaticParams() {
  const postIds = await getAllPostIds();
  return postIds.map((id: any) => ({ id }));
}

export default async function PostPage({ params }: any) {
  const postId = params.id;
  const post = await getPost(postId);
  const postIds = await getAllPostIds();

  if (!post) {
    notFound();
  }

  // Find current post index
  const currentIndex = postIds.indexOf(postId);
  const prevId = postIds[currentIndex - 1] || null;
  const nextId = postIds[currentIndex + 1] || null;

  return (
    <main className="container flex flex-col items-center justify-center p-12">
      <h1>title: {post.title}</h1>
      <p>description: {post.body}</p>

      {/* Navigation */}
      <div className="flex justify-between mt-4 gap-8">
        {prevId ? (
          <Link href={`/posts/${prevId}`} className="text-blue-500">
            ← Previous Post
          </Link>
        ) : <span />}

        {nextId ? (
          <Link href={`/posts/${nextId}`} className="text-blue-500">
            Next Post →
          </Link>
        ) : <span />}
      </div>
    </main>
  );
}
