import { API_BASE_URL } from '@env';

export const api = {
  getPosts: async () => {
    const res = await fetch(`${API_BASE_URL}/api/posts`);
    return res.json();
  },
};
