import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import Header from '../components/Header';

const EducationalOrganizationPage = () => {
  const [educationalOrganizations, setEducationalOrganizations] = useState([]);
  const [newEducationalOrganization, setNewEducationalOrganization] = useState({ name: '', full_name: '', type: '' });
  const [updatedEducationalOrganization, setUpdatedEducationalOrganization] = useState({ id: null, name: '', full_name: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const api = useAxios();

  const [showAddOrganizationDrawer, setShowAddOrganizationDrawer] = useState(false);
  const [showUpdateOrganizationDrawer, setShowUpdateOrganizationDrawer] = useState(false);

  useEffect(() => {
    getEducationalOrganizations();
  }, []);

  const getEducationalOrganizations = async () => {
    try {
      const response = await api.get('/api/educational_organizations/');
      if (response.status === 200) {
        setEducationalOrganizations(response.data);
      }
    } catch (error) {
      console.error('Error fetching educational organizations:', error);
    }
  };

  const addEducationalOrganization = async () => {
    try {
      const response = await api.post('/api/educational_organizations/', newEducationalOrganization);
      if (response.status === 201) {
        setEducationalOrganizations([...educationalOrganizations, response.data]);
        setNewEducationalOrganization({ name: '', full_name: '', type: '' });
        setShowAddOrganizationDrawer(false);
      }
    } catch (error) {
      console.error('Error adding educational organization:', error);
    }
  };

  const updateEducationalOrganization = async () => {
    try {
      const response = await api.put(`/api/educational_organizations/${updatedEducationalOrganization.id}/`, updatedEducationalOrganization);
      if (response.status === 200) {
        setEducationalOrganizations(educationalOrganizations.map(org => (org.id === updatedEducationalOrganization.id ? updatedEducationalOrganization : org)));
        setShowUpdateOrganizationDrawer(false);
        setUpdatedEducationalOrganization({ id: null, name: '', full_name: '', type: '' });
      }
    } catch (error) {
      console.error('Error updating educational organization:', error);
    }
  };

  const deleteEducationalOrganization = async (organizationId) => {
    try {
      const response = await api.delete(`/api/educational_organizations/${organizationId}/`);
      if (response.status === 204) {
        setEducationalOrganizations(educationalOrganizations.filter(org => org.id !== organizationId));
      }
    } catch (error) {
      console.error('Error deleting educational organization:', error);
    }
  };

  const handleOrganizationInputChange = (event) => {
    const { name, value } = event.target;
    setNewEducationalOrganization({
      ...newEducationalOrganization,
      [name]: value
    });
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEducationalOrganization({
      ...updatedEducationalOrganization,
      [name]: value
    });
  };

  const handleOrganizationSubmit = (event) => {
    event.preventDefault();
    addEducationalOrganization();
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    updateEducationalOrganization();
  };

  const showUpdateForm = (organization) => {
    setUpdatedEducationalOrganization(organization);
    setShowUpdateOrganizationDrawer(true);
  };

  const filteredEducationalOrganizations = educationalOrganizations.filter(org => {
    return (
      (selectedType === '' || org.type === selectedType) &&
      (org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div>
      <Header />
      <div className={`container mx-auto p-4 ${showAddOrganizationDrawer || showUpdateOrganizationDrawer ? 'backdrop' : ''}`}>
        <h2 className="text-2xl font-bold mb-4">Образовательные учреждения</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Искать по названию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-400 mr-2"
          />
        </div>
        
        {/* Dropdown for selecting type */}
        <div className="mb-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 rounded border border-gray-400 mr-2"
          >
            <option value="">Все типы</option>
            <option value="ВУЗ">ВУЗ</option>
            <option value="Колледж">Колледж</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddOrganizationDrawer(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Добавить Учреждение
        </button>

        {/* Drawer for Adding Organization */}
        {showAddOrganizationDrawer && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
            <div className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white w-80 dark:bg-gray-800" tabIndex="-1">
              <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Добавить образовательное учреждение</h5>
              <button type="button" onClick={() => setShowAddOrganizationDrawer(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
              <form className="space-y-6" onSubmit={handleOrganizationSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newEducationalOrganization.name}
                    onChange={handleOrganizationInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Введите название"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Полное название</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    value={newEducationalOrganization.full_name}
                    onChange={handleOrganizationInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Введите полное название"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тип</label>
                  <select
                    name="type"
                    id="type"
                    value={newEducationalOrganization.type}
                    onChange={handleOrganizationInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  >
                    <option value="">Выберите тип</option>
                    <option value="ВУЗ">ВУЗ</option>
                    <option value="Колледж">Колледж</option>
                  </select>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Добавить</button>
              </form>
            </div>
          </>
        )}

        <ul>
          {filteredEducationalOrganizations.map((educationalOrganization) => (
            <li key={educationalOrganization.id} className="border rounded p-4 mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold">{educationalOrganization.name}</h3>
                  <p className="text-gray-500">{educationalOrganization.full_name}</p>
                  <p className="text-gray-500">{educationalOrganization.type}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => showUpdateForm(educationalOrganization)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => deleteEducationalOrganization(educationalOrganization.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Drawer for Updating Organization */}
        {showUpdateOrganizationDrawer && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
            <div className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white w-80 dark:bg-gray-800" tabIndex="-1">
              <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Изменить образовательное учреждение</h5>
              <button type="button" onClick={() => setShowUpdateOrganizationDrawer(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
              <form className="space-y-6" onSubmit={handleUpdateSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={updatedEducationalOrganization.name}
                    onChange={handleUpdateInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Введите название"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Полное название</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    value={updatedEducationalOrganization.full_name}
                    onChange={handleUpdateInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Введите полное название"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тип</label>
                  <select
                    name="type"
                    id="type"
                    value={updatedEducationalOrganization.type}
                    onChange={handleUpdateInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  >
                    <option value="">Выберите тип</option>
                    <option value="ВУЗ">ВУЗ</option>
                    <option value="Колледж">Колледж</option>
                  </select>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Изменить</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EducationalOrganizationPage;
