import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4">
                {/* Add padding to the container */}
                <div className="mt-8">
                    <h1 className="text-3xl font-bold mb-4">Добро пожаловать в систему Корпоративного Университета</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Three decorated buttons */}
                        <Link to="/educational_organizations" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center">
                            Образовательные учреждения
                        </Link>
                        <Link to="/activities" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block text-center">
                            Активности
                        </Link>
                        <Link to="/subdivisions" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded block text-center">
                            Подразделения
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
