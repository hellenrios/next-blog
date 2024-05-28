// src/pages/login.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthHeader from "../components/AuthHeader";

const Login: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="bg-[#F7F4ED] min-h-screen flex flex-col">
      <AuthHeader />
      <div className="flex-grow flex justify-center items-center py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow m-5">
          <h1 className="text-2xl text-center font-bold mb-8">Login</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Endereço de e-mail inválido")
                .required("Campo obrigatório"),
              password: Yup.string().required("Campo obrigatório"),
            })}
            onSubmit={(values) => {
              handleLogin();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    E-mail
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="email"
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
                    {isSubmitting ? "Entrando..." : "Entrar"}
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

export default Login;
