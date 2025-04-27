// pages/create.tsx
'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';
import { createPost } from '@/services/postServices';
import { addPost } from '@/lib/postsSlice';

export default function CreatePost() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await createPost({ title, body, userId: 1 });
    dispatch(addPost(data)); 
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Create Post</button>
    </form>
  );
}
