import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommunityInput from '../components/CommunityInput';
import CommunityPost from '../components/CommunityPost';
import { getCommunityPosts, createPost } from '../services/communityApi';

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const postsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getCommunityPosts();
      setPosts(response);
    } catch (error) {
      console.error('Error fetching community posts:', error);
    }
  };

  const scrollToBottom = () => {
    postsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [posts]);

  const handleCreatePost = async (content: string) => {
    setIsLoading(true);
    try {
      const newPost = await createPost(content);
      setPosts((prev) => [...prev, newPost]);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px-72px)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community Space
          </h1>
        </div>
      </div>

      {/* Posts Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="container mx-auto max-w-3xl">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <CommunityPost post={post} />
            </motion.div>
          ))}
          <div ref={postsEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="container mx-auto max-w-3xl p-4">
        <CommunityInput onPost={handleCreatePost} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CommunityPage;
