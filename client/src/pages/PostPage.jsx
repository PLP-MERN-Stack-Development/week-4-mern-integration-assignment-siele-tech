import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService, authService } from '../services/api';
import CommentForm from '../components/CommentForm';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await postService.getPost(id);
        setPost(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    // Get current user
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (commentData) => {
    try {
      const res = await postService.addComment(id, commentData);
      setPost(res.data); // Update post with new comment
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
          <div className="flex items-center text-gray-600 text-sm mb-4">
            {post.category && (
              <span className="mr-4 px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                {post.category.name}
              </span>
            )}
            <span>by {post.author?.firstName} {post.author?.lastName}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{post.viewCount} views</span>
          </div>
          {post.excerpt && (
            <p className="text-lg text-gray-600 italic">{post.excerpt}</p>
          )}
        </header>

        <div className="prose max-w-none mb-6">
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Comments ({post.comments?.length || 0})</h2>
        
        {user && (
          <CommentForm onSubmit={handleCommentSubmit} />
        )}

        <div className="mt-6 space-y-4">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-4">
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-gray-900">
                    {comment.user?.firstName} {comment.user?.lastName}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostPage; 