import { useState, useEffect } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/posts');
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load posts');
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    const { data } = await api.post('/posts', postData);
    setPosts([data, ...posts]);
  };

  const handleLike = async (postId) => {
    try {
      const { data } = await api.put(`/posts/${postId}/like`);
      setPosts(posts.map((post) => (post._id === postId ? data : post)));
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const { data } = await api.put(`/posts/${postId}/unlike`);
      setPosts(posts.map((post) => (post._id === postId ? data : post)));
    } catch (err) {
      console.error('Failed to unlike post:', err);
    }
  };

  const handleComment = async (postId, text) => {
    try {
      const { data } = await api.post(`/posts/${postId}/comments`, { text });
      setPosts(posts.map((post) => (post._id === postId ? data : post)));
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const handleUpdate = async (postId, updateData) => {
    try {
      const { data } = await api.put(`/posts/${postId}`, updateData);
      setPosts(posts.map((post) => (post._id === postId ? data : post)));
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <CreatePost onPostCreated={handleCreatePost} />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">No posts yet. Be the first to post something!</p>
            </div>
          ) : (
            <div>
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLike={handleLike}
                  onUnlike={handleUnlike}
                  onComment={handleComment}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
