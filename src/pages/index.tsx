import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import EditPostModal from "../components/EditPostModal";
import { useAuth } from "../context/authContext";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

const Home: React.FC = () => {
  const { posts, isAuthenticated, setPosts } = useAuth();
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const router = useRouter();

  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    setPostToDelete(null);
  };

  const handleSaveEditPost = (values: { title: string; content: string }) => {
    if (postToEdit) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postToEdit.id ? { ...post, ...values } : post
        )
      );
      setPostToEdit(null);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Todas as Postagens</h1>
        <ul className="mt-4">
          {posts.map((post) => (
            <li key={post.id} className="mb-4 p-4 border rounded shadow-sm">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p>{post.content}</p>
              <p className="text-sm text-gray-500">Autor: {post.author}</p>
              {isAuthenticated && (
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => setPostToEdit(post)}
                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-green-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setPostToDelete(post)}
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        {postToDelete && (
          <Modal
            title="Confirmar Exclusão"
            message={`Você tem certeza que deseja excluir a postagem "${postToDelete.title}"?`}
            onConfirm={() => handleDeletePost(postToDelete.id)}
            onCancel={() => setPostToDelete(null)}
          />
        )}
        {postToEdit && (
          <EditPostModal
            post={postToEdit}
            onClose={() => setPostToEdit(null)}
            onSave={handleSaveEditPost}
          />
        )}
      </div>
    </Layout>
  );
};

export default Home;
