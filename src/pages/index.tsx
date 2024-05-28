// src/pages/index.tsx
import React, { useState, useEffect } from "react";
import withAuth from "../hocs/withAuth";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import api from "../services/api";
import { useAuth } from "../context/authContext";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts/list");
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar postagens:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (postId: number) => {
    try {
      await api.delete(`/posts/delete/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      setPostToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir a postagem:", error);
    }
  };

  const handleEditPost = (post: Post) => {
    // Implementar lógica de edição de postagem
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
              {isAuthenticated && post.author === "current-user" && (
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setPostToDelete(post)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
      </div>
    </Layout>
  );
};

export default withAuth(Home);
