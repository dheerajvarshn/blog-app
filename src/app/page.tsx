'use client';
import { removePost, setPosts } from '@/lib/postsSlice';
import { RootState } from '@/lib/store';
import { deletePost, getPosts } from '@/services/postServices';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    if (posts.length === 0) { // 👈 Only fetch from server if not already loaded
      (async () => {
        const { data } = await getPosts();
        dispatch(setPosts(data));
      })();
    }
  }, [dispatch, posts.length]);

  const handleDelete = async (id: number) => {
    await deletePost(id);
    dispatch(removePost(id)); // 👈 update store locally, no refetch
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Posts</h1>
        <Link href="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Post
        </Link>
      </div>
      <div className="grid gap-4">
        {posts?.map((post) => (
          <div key={post.id} className="border p-4 rounded shadow">
            <Link href={`/post/${post.id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p>{post.body}</p>
            <div className="flex gap-2 mt-2">
              <Link href={`/edit/${post.id}`} className="text-blue-500">
                Edit
              </Link>
              <button onClick={() => handleDelete(post.id)} className="text-red-500" style={{cursor:'pointer'}}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
