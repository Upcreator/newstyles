import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import Header from '../components/Header';
import Modal from '../components/Modal';

const StudentApplicationListPage = () => {
    const [applications, setApplications] = useState([]);
    const [practices, setPractices] = useState([]);
    const [educational_organizations, setEducational_organizations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentApplication, setCurrentApplication] = useState(null);
    const api = useAxios();

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleString('ru-RU', options);
    };

    useEffect(() => {
        fetchDataforApplications();
    }, []);

    const fetchDataforApplications = async () => {
        try {
            const [applicationsResponse, practicesResponse, educational_organizationResponse] = await Promise.all([
                api.get('/application/list/'),
                api.get('/api/practices/'),
                api.get('/api/educational_organizations/')
            ]);
            setApplications(applicationsResponse.data);
            setPractices(practicesResponse.data);
            setEducational_organizations(educational_organizationResponse.data);
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

    const getEducational_organizationName = (educational_organizationId) => {
        const educational_organization = educational_organizations.find(educational_organization => educational_organization.id === educational_organizationId);
        return educational_organization ? educational_organization.full_name : 'Unknown';
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
                <h1 className="text-3xl font-bold mb-4">Нерассмотренные заявки</h1>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Заявки</h2>
                    <table className="w-full">
                        <thead className ='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <div className='flex items-center'>
                                    ФИО
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className='flex items-center'>
                                        Дата заявки
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className='flex items-center'>
                                    Email
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className='flex items-center'>
                                    Образовательное учреждение
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className='flex items-center'>
                                    Статус
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className='flex items-center'>
                                    Практика
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(application => (
                                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={application.id}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{application.full_name}</td>
                                    <td className="px-6 py-4">{formatDate(application.created_at)}</td>
                                    <td className="px-6 py-4">{application.email}</td>
                                    <td className="px-6 py-4">{getEducational_organizationName(application.educational_organization)}</td>
                                    <td className="px-6 py-4">{application.status}</td>
                                    <td className="px-6 py-4">{getPracticeName(application.practice)}</td>                             
                                    <td class="px-6 py-4">
                                        <div href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => openModal(application)}>Изменить статус</div>
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
                    practices={practices} 
                    educational_organizations={educational_organizations} 
                    onClose={closeModal} 
                    onChangeStatus={handleChangeStatus}
                />
            )}
        </div>
    );
};

export default StudentApplicationListPage;
