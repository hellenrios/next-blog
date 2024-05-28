import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSearch, FaSignOutAlt, FaBars } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { useAuth } from "../context/authContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePostClick = () => {
    router.push("/post");
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <header className="bg-white shadow">
      <div className="border-b border-black">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" legacyBehavior>
            <a className="flex items-center">
              <span className="text-3xl font-bold font-playfair">Mit Blog</span>
            </a>
          </Link>
          <div className="hidden md:flex flex-1 items-center ml-4">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Pesquise um post"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute top-3 right-3 text-gray-500" />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handlePostClick}
              className="flex justify-end items-center"
            >
              <FiEdit className="h-6 w-6 mr-2 text-gray-700" />
              Postar
            </button>
            <button onClick={handleHomeClick}>
              <AiOutlineHome className="h-6 w-6 text-gray-700" />
            </button>

            <button
              onClick={logout}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-red-500"
            >
              <FaSignOutAlt className="inline-block mr-2" />
              Log Out
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              <FaBars className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden p-4">
            <div className="flex flex-col items-end space-y-4">
              <div className="relative w-full max-w-xs flex justify-end">
                <FaSearch className="text-gray-500" />
                <span className="ml-2">Pesquisa</span>
              </div>
              <button
                className="flex items-center justify-end"
                onClick={handlePostClick}
              >
                <FiEdit className="h-6 w-6 mr-2 text-gray-700" />
                Postar
              </button>
              <button
                className="flex items-center justify-end"
                onClick={handleHomeClick}
              >
                <AiOutlineHome className="h-6 w-6 mr-2 text-gray-700" />
                Home
              </button>

              <button
                onClick={logout}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-red-500"
              >
                <FaSignOutAlt className="inline-block mr-2" />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
