import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface EditPostModalProps {
  post: Post;
  onClose: () => void;
  onSave: (values: { title: string; content: string }) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  post,
  onClose,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Editar Postagem</h2>
        <Formik
          initialValues={{ title: post.title, content: post.content }}
          validationSchema={Yup.object({
            title: Yup.string().required("Cabeçalho é obrigatório"),
            content: Yup.string().required("Conteúdo é obrigatório"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            onSave(values);
            setSubmitting(false);
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
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 px-4 py-2 border border-transparent rounded-full text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-black hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPostModal;
