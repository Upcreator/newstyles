import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import Header from '../components/Header';
import Modal from '../components/Modal';

const StudentApplicationListPage = () => {
    const [applications, setApplications] = useState([]);
    const [practices, setPractices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentApplication, setCurrentApplication] = useState(null);
    const api = useAxios();

    useEffect(() => {
        fetchApplicationsAndPractices();
    }, []);

    const fetchApplicationsAndPractices = async () => {
        try {
            const [applicationsResponse, practicesResponse] = await Promise.all([
                api.get('/application/list/'),
                api.get('/api/practices/')
            ]);
            setApplications(applicationsResponse.data);
            setPractices(practicesResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeStatus = async (id, newStatus) => {
        try {
            const applicationToUpdate = applications.find(app => app.id === id);
            const response = await api.put(`/application/manage/${id}/`, {
                full_name: applicationToUpdate.full_name,
                date_birth: applicationToUpdate.date_birth,
                email: applicationToUpdate.email,
                phone_number: applicationToUpdate.phone_number,
                status: newStatus,
                practice: applicationToUpdate.practice
            });
            setApplications(applications.map(application => {
                if (application.id === id) {
                    return { ...application, status: newStatus };
                }
                return application;
            }));
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getPracticeName = (practiceId) => {
        const practice = practices.find(practice => practice.id === practiceId);
        return practice ? practice.name : 'Unknown';
    };

    const openModal = (application) => {
        setCurrentApplication(application);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentApplication(null);
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-4">Список Заявок Студентов</h1>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Заявки</h2>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-2 border">ФИО</th>
                                <th className="p-2 border">Дата рождения</th>
                                <th className="p-2 border">Email</th>
                                <th className="p-2 border">Телефон</th>
                                <th className="p-2 border">Статус</th>
                                <th className="p-2 border">Практика</th>
                                <th className="p-2 border">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(application => (
                                <tr key={application.id}>
                                    <td className="p-2 border">{application.full_name}</td>
                                    <td className="p-2 border">{application.date_birth}</td>
                                    <td className="p-2 border">{application.email}</td>
                                    <td className="p-2 border">{application.phone_number}</td>
                                    <td className="p-2 border">{application.status}</td>
                                    <td className="p-2 border">{getPracticeName(application.practice)}</td>
                                    <td className="p-2 border">
                                        <button 
                                            onClick={() => openModal(application)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Изменить статус
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && currentApplication && (
                <Modal 
                    application={currentApplication} 
                    onClose={closeModal} 
                    onChangeStatus={handleChangeStatus}
                />
            )}
        </div>
    );
};

export default StudentApplicationListPage;
