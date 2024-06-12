import React from 'react';

const ModalDetail = ({ application, practices, educational_organizations, onClose, onChangeStatus }) => {
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

    const getPracticeName = (practiceId) => {
        const practice = practices.find(practice => practice.id === practiceId);
        return practice ? practice.name : 'Unknown';
    };

    const getEducational_organizationName = (educational_organizationId) => {
        const educational_organization = educational_organizations.find(educational_organization => educational_organization.id === educational_organizationId);
        return educational_organization ? educational_organization.full_name : 'Unknown';
    };

    return (
        <div id="default-modal" className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Вы рассматриваете заявку {application.full_name}
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-full bg-white divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-700">
                        <div className="flex bg-gray-50 dark:bg-gray-800">
                            <div className="w-1/2 py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Метаданные
                            </div>
                            <div className="w-1/2 py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Значение
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                                ФИО
                            </div>
                            <div className="w-1/2 py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {application.full_name}
                            </div>
                        </div>
                        <div className="flex bg-gray-50 dark:bg-gray-800">
                            <div className="w-1/2 py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                                Дата заявки
                            </div>
                            <div className="w-1/2 py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(application.created_at)}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                                Образовательное учреждение
                            </div>
                            <div className="w-1/2 py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {getEducational_organizationName(application.educational_organization)}
                            </div>
                        </div>
                        <div className="flex bg-gray-50 dark:bg-gray-800">
                            <div className="w-1/2 py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                                Практика
                            </div>
                            <div className="w-1/2 py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {getPracticeName(application.practice)}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </div>
                            <div className="w-1/2 py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {application.email}
                            </div>
                        </div>
                        <div className="flex bg-gray-50 dark:bg-gray-800">
                            <div className="w-1/2 py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                                Телефон
                            </div>
                            <div className="w-1/2 py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                                {application.phone_number}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button 
                        onClick={() => { onChangeStatus(application.id, 'Принято'); onClose(); }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Принять
                    </button>
                    <button 
                        onClick={() => { onChangeStatus(application.id, 'Отклонено'); onClose(); }}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800 dark:hover:border-gray-700 dark:focus:ring-gray-600 dark:focus:ring-opacity-50 dark:focus:border-gray-700 dark:focus:ring focus:ring-gray-200 focus:border-gray-300 transition duration-150 ease-in-out"
                        >
                            Отклонить
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    export default ModalDetail;
