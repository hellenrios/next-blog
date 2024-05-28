import React from "react";
import { useAuth } from "../context/authContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthHeader from "../components/AuthHeader";

const Register: React.FC = () => {
  const { register } = useAuth();

  return (
    <div className="bg-[#F7F4ED] min-h-screen flex flex-col">
      <AuthHeader />
      <div className="flex-grow flex justify-center items-center py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow m-5">
          <h1 className="text-2xl text-center font-bold mb-8">Cadastre-se</h1>
          <Formik
            initialValues={{ name: "", login: "", password: "" }}
            validationSchema={Yup.object({
              name: Yup.string().required("Nome é obrigatório"),
              login: Yup.string()
                .email("Email inválido")
                .required("Email é obrigatório"),
              password: Yup.string()
                .required("Senha é obrigatória")
                .matches(
                  /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
                  "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial"
                ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              register(values.name, values.login, values.password);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nome
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-2"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="login"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="login"
                    id="login"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="login"
                    component="div"
                    className="text-red-600 text-sm mt-2"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Senha
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-2"
                  />
                </div>

                <div className="mb-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 border border-transparent rounded-full text-sm font-medium text-white bg-black hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {isSubmitting ? "Registrando..." : "Cadastrar"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
