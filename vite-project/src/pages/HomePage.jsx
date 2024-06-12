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
                    <h1 className="text-3xl font-bold mb-4">Добро пожаловать в систему практик Корпоративного Университета</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Three images with text on hover */}
                        <Link to="/educational_organizations" className="relative block w-full h-64">
                            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://s.rbk.ru/v1_companies_s3/media/news_body_images/1e94bed7-3583-48bc-bb6c-b9b340918585.jpg')" }}></div>
                            <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 bg-blue-500 flex justify-center items-center text-white font-bold">
                                <div className="text-center">
                                    <h3 className="text-2xl">Образовательные учреждения</h3>
                                    <p className="mt-2 text-sm">Описание образовательных учреждений</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/activities" className="relative block w-full h-64">
                            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://avatars.mds.yandex.net/i?id=1800e1bb71c79136f02affe2d8337af43e6b78fd-12585680-images-thumbs&n=13')" }}></div>
                            <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 bg-blue-500 flex justify-center items-center text-white font-bold">
                                <div className="text-center">
                                    <h3 className="text-2xl">Активности</h3>
                                    <p className="mt-2 text-sm">Описание активности</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/subdivisions" className="relative block w-full h-64">
                            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://telegra.ph/file/af345febbce3c6f170f2c.jpg')" }}></div>
                            <div className="opacity-0 hover:opacity-80 duration-300 absolute inset-0 z-10 bg-blue-500 flex justify-center items-center text-white font-bold">
                                <div className="text-center">
                                    <h3 className="text-2xl">Подразделения</h3>
                                    <p className="mt-2 text-sm">Описание подразделений</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
