import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';

const EducationalOrganizationPage = () => {
  const [educationalOrganizations, setEducationalOrganizations] = useState([]);
  const [newEducationalOrganization, setNewEducationalOrganization] = useState({ name: '', full_name: '' });
  const [updatedEducationalOrganization, setUpdatedEducationalOrganization] = useState({ id: null, name: '', full_name: '' });
  const [searchTerm, setSearchTerm] = useState('');
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
    return org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           org.full_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
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
      <button 
        onClick={() => setShowAddOrganizationForm(!showAddOrganizationForm)} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showAddOrganizationForm ? 'Скрыть Учреждение' : 'Добавить Учреждение'}
      </button>

      {showAddOrganizationForm && (
        <form onSubmit={handleOrganizationSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            value={newEducationalOrganization.name}
            placeholder="Название"
            onChange={handleOrganizationInputChange}
            required
            className="p-2 rounded border border-gray-400 mr-2"
          />
          <input
            type="text"
            name="full_name"
            value={newEducationalOrganization.full_name}
            placeholder="Полное название"
            onChange={handleOrganizationInputChange}
            required
            className="p-2 rounded border border-gray-400 mr-2"
          />
          <button 
            type="submit" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Добавить Учреждение
          </button>
        </form>
      )}

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
            {showUpdateOrganizationForm && updatedEducationalOrganization.id === educationalOrganization.id && (
              <form onSubmit={handleUpdateSubmit} className="mt-2">
                <input
                  type="text"
                  name="name"
                  value={updatedEducationalOrganization.name}
                  placeholder="Название"
                  onChange={handleUpdateInputChange}
                  required
                  className="p-2 rounded border border-gray-400 mr-2"
                />
                <input
                  type="text"
                  name="full_name"
                  value={updatedEducationalOrganization.full_name}
                  placeholder="Полное название"
                  onChange={handleUpdateInputChange}
                  required
                  className="p-2 rounded border border-gray-400 mr-2"
                />
                <button 
                  type="submit" 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Изменить
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationalOrganizationPage;
