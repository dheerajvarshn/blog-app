// services/postsService.ts
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = () => axios.get(API_URL);
export const getPostById = (id: number) => axios.get(`${API_URL}/${id}`);
export const createPost = (post: { title: string; body: string; userId: number }) =>
  axios.post(API_URL, post);
export const updatePost = (id: number, post: { title: string; body: string; userId: number }) =>
  axios.put(`${API_URL}/${id}`, post);
export const deletePost = (id: number) => axios.delete(`${API_URL}/${id}`);
