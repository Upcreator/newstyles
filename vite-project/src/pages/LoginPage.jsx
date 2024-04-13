import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

import LoginPageImage from '../static/LoginPageImage1.jpg';
import CorpUniversityLogo from '../static/CorpUniversityLogo.jpg';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
        {/* Image Section */}
        <div className="md:w-1/2 hidden md:block">
            <img src={LoginPageImage} alt="Login Image" className="object-cover w-full h-full" />
        </div>
        
        {/* Login Form Section */}
        <div className="md:w-1/2 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            {/* Logo */}
            <div className="mb-8 md:mb-0 flex justify-center">
            <img src={CorpUniversityLogo} alt="Corp University Logo" className="object-contain w-1/2 h-auto" />
            </div>

            {/* Login Header */}
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Копроративный университет ГСП</h2>

            {/* Login Form */}
            <form className="space-y-4" onSubmit={loginUser}>
            <div>
                <label htmlFor="username" className="block text-gray-700 font-semibold">Логин</label>
                <input type="text" id="username" name="username" className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold">Пароль</label>
                <input type="password" id="password" name="password" className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="flex justify-between">
                <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Войти</button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default LoginPage;
