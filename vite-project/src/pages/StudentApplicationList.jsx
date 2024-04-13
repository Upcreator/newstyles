import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import axios from 'axios';

const StudentApplicationListPage = () => {
    const [applications, setApplications] = useState([]);
    const [practices, setPractices] = useState([]);
    const api = useAxios();

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const [applicationsResponse, practicesResponse] = await Promise.all([
                api.get('/application/list/'),
                api.get('/api/practices/') // Adjust the endpoint based on your API
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
                practice: applicationToUpdate.practice // Include practice field
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

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Список Заявок Студентов</h1>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Заявки</h2>
                <ul>
                    {applications.map(application => (
                        <li key={application.id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                            {/* Display application details */}
                            <p className="text-lg font-semibold">{application.full_name}</p>
                            <p>Статус: {application.status}</p>
                            {/* Buttons for changing status */}
                            <div className="flex mt-2">
                                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 mr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" onClick={() => handleChangeStatus(application.id, 'Отклонено')}>Отклонить</button>
                                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" onClick={() => handleChangeStatus(application.id, 'Принято')}>Принять</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StudentApplicationListPage;
