'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      const sessionUserId = session?.user?.id;
      const paramUserId = params.userId;

      if (sessionUserId === paramUserId) {
        setIsAuthorized(true);
        fetchUserBlogs(paramUserId);
      } else {
        router.push('/unauthorized');
      }
    }
  }, [session, status, params.userId]);

  const fetchUserBlogs = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}/Blog/CreateBlog`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleDelete = async (blogId: string) => {
  const confirmDelete = confirm('Are you sure you want to delete this blog?');
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/blogs/${blogId}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Failed to delete blog');

    setBlogs((prev) => prev.filter((b: any) => b._id !== blogId));
  } catch (error) {
    console.error('Delete error:', error);
    alert('Failed to delete blog.');
  }
};


  if (status === 'loading') return <div className="p-6">Loading...</div>;
  if (!isAuthorized) return null;

  return (
    <motion.div
      className="min-h-screen p-6 bg-gradient-to-br from-white to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Blogs</h1>
        <button
          onClick={() => router.push(`/${params.userId}/blog/CreateBlog`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Create Blog
        </button>
      </div>

      {loadingBlogs ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">You haven't created any blogs yet.</p>
      ) : (
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

{blogs.map((blog: any, index) => (
  <motion.div
    key={blog._id}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
  >
    {/* Wrap image and title inside Link */}
    <Link href={`/${params.userId}/blog/${blog._id}`}>
    
        {/* Blog Image */}
        {blog.images && blog.images.length > 0 ? (
          <img
            src={blog.images[0]}
            alt="Blog Image"
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1 px-4 py-2">
          {blog.heading}
        </h2>
     
    </Link>

    {/* Like/Dislike/Time */}
    <div className="text-sm text-gray-600 mb-2 flex justify-between px-4">
      <div className="flex gap-3">
        <span>👍 {blog.likes ?? 0}</span>
        <span>👎 {blog.dislikes ?? 0}</span>
      </div>
      <span className="text-xs">
        {blog.createdAt ? new Date(blog.createdAt).toLocaleString() : 'N/A'}
      </span>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-between mt-2 px-4 pb-4">
      <button
        onClick={() => router.push(`/${params.userId}/blog/${blog._id}/edit`)}
        className="text-blue-600 hover:underline"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(blog._id)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  </motion.div>
))}

</div>


      )}
    </motion.div>
  );
}
