import React from "react";
import Link from "next/link";

const AuthHeader: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="border-b border-black">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" legacyBehavior>
            <a className="flex items-center">
              <span className="text-3xl font-bold font-playfair">Mit Blog</span>
            </a>
          </Link>
          <div className="flex space-x-4">
            <Link href="/login" legacyBehavior>
              <a className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500">
                Login
              </a>
            </Link>
            <Link href="/register" legacyBehavior>
              <a className="bg-black text-white px-4 py-2 rounded-full hover:bg-green-500">
                Cadastre-se
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
