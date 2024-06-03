import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { logoutUser } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to handle logout
    const handleLogout = () => {
        logoutUser();
    };

    // Function to toggle menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // JSX for header with dropdown menu
    return (
        <header className="bg-blue-500 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Add horizontal padding to the left */}
                <Link to="/" className="text-2xl font-bold px-4">Корпоративный Университет</Link>
                {/* Dropdown menu button */}
                <div className="relative hidden md:block">
                    {/* Links for larger screens */}
                    <nav>
                        <ul className="flex space-x-4 font-bold">
                            <li><a href="/practices" className="hover:text-gray-300">Практики</a></li>
                            <li><a href="/application_list" className="hover:text-gray-300">Заявки</a></li>
                            <li><a href="/moderators" className="hover:text-gray-300">Модераторы</a></li>
                            <li><a href="#" className="hover:text-gray-300" onClick={handleLogout}>Выйти</a></li>
                        </ul>
                    </nav>
                </div>
                {/* Dropdown menu */}
                <div className="relative">
                    {/* Add horizontal padding to the right */}
                    <button
                        className="block md:hidden text-gray-300 hover:text-white focus:outline-none px-4"
                        onClick={toggleMenu}
                    >
                        Menu
                    </button>
                    <div
                        className={`${menuOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10 transition-opacity duration-300`}
                    >
                        <ul className="divide-y divide-gray-700">
                            <li>
                                <Link
                                    to="/practices"
                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-300"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Практики
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/application_list"
                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-300"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Заявки
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/moderators"
                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-300"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Модераторы
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-300"
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
