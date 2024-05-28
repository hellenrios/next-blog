// src/pages/post.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import api from "../services/api";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

const PostPage: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

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

  const handleCreateOrUpdatePost = async (values: {
    title: string;
    content: string;
  }) => {
    if (editingPost) {
      try {
        await api.patch(`/posts/edit/${editingPost.id}`, values);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editingPost.id ? { ...post, ...values } : post
          )
        );
        setEditingPost(null);
      } catch (error) {
        console.error("Erro ao atualizar a postagem:", error);
      }
    } else {
      try {
        const response = await api.post("/posts/create", values);
        const newPost = response.data;
        setPosts((prevPosts) => [...prevPosts, newPost]);
        router.push("/"); // Redireciona para a página inicial após a criação da postagem
      } catch (error) {
        console.error("Erro ao criar a postagem:", error);
      }
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await api.delete(`/posts/delete/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      setPostToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir a postagem:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          {editingPost ? "Editar Postagem" : "Criar Postagem"}
        </h1>
        <Formik
          initialValues={{
            title: editingPost ? editingPost.title : "",
            content: editingPost ? editingPost.content : "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Cabeçalho é obrigatório"),
            content: Yup.string().required("Conteúdo é obrigatório"),
          })}
          onSubmit={(values) => {
            handleCreateOrUpdatePost(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cabeçalho
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Conteúdo
                </label>
                <Field
                  as="textarea"
                  name="content"
                  id="content"
                  rows="4"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 text-sm mt-2"
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 border border-transparent rounded-full text-sm font-medium text-white bg-black hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {isSubmitting
                    ? "Salvando..."
                    : editingPost
                    ? "Atualizar"
                    : "Criar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <h2 className="text-xl font-bold mt-8">Suas Postagens</h2>
        <ul className="mt-4">
          {posts
            .filter((post) => post.author === "current-user")
            .map((post) => (
              <li key={post.id} className="mb-4 p-4 border rounded shadow-sm">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p>{post.content}</p>
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

export default PostPage;
