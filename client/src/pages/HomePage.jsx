import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postService, authService } from '../services/api';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await postService.getAllPosts();
        setPosts(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner size="lg" text="Loading posts..." />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Latest Posts</h1>
        {user && (
          <Link
            to="/posts/new"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Create New Post
          </Link>
        )}
      </div>
      
      <div className="grid gap-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No posts found.</p>
            {user && (
              <Link
                to="/posts/new"
                className="inline-block mt-2 text-primary-600 hover:underline"
              >
                Create the first post!
              </Link>
            )}
          </div>
        ) : (
          posts.map(post => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default HomePage; 