import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../components/Layout";
import { useAuth } from "../context/authContext";
import Modal from "../components/Modal";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

const PostPage: React.FC = () => {
  const router = useRouter();
  const { currentUser, setPosts } = useAuth();
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const handleCreateOrUpdatePost = (values: {
    title: string;
    content: string;
  }) => {
    const newPost = {
      id: Date.now(),
      ...values,
      author: currentUser?.name || "Unknown",
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    router.push("/");
  };

  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    setPostToDelete(null);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Criar Postagem</h1>
        <Formik
          initialValues={{
            title: "",
            content: "",
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
                  {isSubmitting ? "Salvando..." : "Criar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
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
