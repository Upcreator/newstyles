import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import Header from '../components/Header';
import Modal from '../components/Modal'; // Assuming you have a Modal component

const EducationalOrganizationPage = () => {
  const [educationalOrganizations, setEducationalOrganizations] = useState([]);
  const [newEducationalOrganization, setNewEducationalOrganization] = useState({ name: '', full_name: '' });
  const [updatedEducationalOrganization, setUpdatedEducationalOrganization] = useState({ id: null, name: '', full_name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const api = useAxios();

  const [showAddOrganizationForm, setShowAddOrganizationForm] = useState(false);
  const [showUpdateOrganizationForm, setShowUpdateOrganizationForm] = useState(false);

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
        setNewEducationalOrganization({ name: '', full_name: '' });
        setShowAddOrganizationForm(false);
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
        setShowUpdateOrganizationForm(false);
        setUpdatedEducationalOrganization({ id: null, name: '', full_name: '' });
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
    setShowUpdateOrganizationForm(true);
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
      <div className="container mx-auto p-4">
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
          onClick={() => setShowAddOrganizationForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Добавить Учреждение
        </button>

        <Modal show={showAddOrganizationForm} onClose={() => setShowAddOrganizationForm(false)}>
          <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-6" onSubmit={handleOrganizationSubmit}>
              <h5 class="text-xl font-medium text-gray-900 dark:text-white">Add Educational Organization</h5>
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newEducationalOrganization.name}
                  onChange={handleOrganizationInputChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div>
                <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  value={newEducationalOrganization.full_name}
                  onChange={handleOrganizationInputChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Organization</button>
            </form>
          </div>
        </Modal>

        <ul className="mt-4">
          {filteredEducationalOrganizations.map(educationalOrganization => (
            <li key={educationalOrganization.id} className="mb-4">
              <div className="border border-gray-300 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{educationalOrganization.name}</h3>
                  <div>
                    <button
                      onClick={() => showUpdateForm(educationalOrganization)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Изменить
                    </button>
                    <button
                      onClick={() => deleteEducationalOrganization(educationalOrganization.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">{educationalOrganization.full_name}</p>
              </div>
            </li>
          ))}
        </ul>
        <Modal show={showUpdateOrganizationForm} onClose={() => setShowUpdateOrganizationForm(false)}>
          <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-6" onSubmit={handleUpdateSubmit}>
              <h5 class="text-xl font-medium text-gray-900 dark:text-white">Изменить Образовательное Учреждение</h5>
              <div>
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={updatedEducationalOrganization.name}
                  onChange={handleUpdateInputChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div>
                <label for="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  value={updatedEducationalOrganization.full_name}
                  onChange={handleUpdateInputChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Organization</button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default EducationalOrganizationPage;
