// store/postsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },
    updatePost(state, action: PayloadAction<Post>) {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    removePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setPosts, addPost, updatePost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
