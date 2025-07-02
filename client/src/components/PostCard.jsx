import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postService, authService } from '../services/api';

function PostCard({ post }) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const user = authService.getCurrentUser();
  const isAuthor = user && post.author?._id === user.id;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    setDeleting(true);
    try {
      await postService.deletePost(post._id);
      window.location.reload(); // Refresh to update the list
    } catch (err) {
      console.error('Failed to delete post:', err);
      alert('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <Link to={`/posts/${post._id}`} className="text-xl font-semibold text-primary-700 hover:underline flex-1">
          {post.title}
        </Link>
        {isAuthor && (
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => navigate(`/posts/${post._id}/edit`)}
              className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-sm px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>
      
      <div className="text-gray-600 text-sm mb-2">
        {post.category && (
          <span className="mr-2 px-2 py-1 bg-primary-100 text-primary-700 rounded">
            {post.category.name}
          </span>
        )}
        by {post.author?.firstName} {post.author?.lastName}
        <span className="mx-2">•</span>
        {new Date(post.createdAt).toLocaleDateString()}
      </div>
      
      <div className="mb-2 text-gray-800">
        {post.excerpt || post.content?.slice(0, 120) + (post.content?.length > 120 ? '...' : '')}
      </div>
      
      <div className="flex justify-between items-center">
        <Link to={`/posts/${post._id}`} className="text-primary-600 hover:underline text-sm">
          Read more
        </Link>
        {post.comments && (
          <span className="text-gray-500 text-sm">
            {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}

export default PostCard; 