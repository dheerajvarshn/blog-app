// pages/edit/[id].tsx
'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { updatePost } from '@/lib/postsSlice';
import { getPostById,updatePost as updatePostApi  } from '@/services/postServices';

export default function EditPost() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await getPostById(id);
      setTitle(data.title);
      setBody(data.body);
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await updatePostApi(id, { title, body, userId: 1 });
    dispatch(updatePost(data)); 
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
      <button type="submit" className="bg-green-500 text-white p-2">Update Post</button>
    </form>
  );
}
