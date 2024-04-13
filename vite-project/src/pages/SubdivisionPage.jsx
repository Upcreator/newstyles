import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';

const SubdivisionPage = () => {
  const [subdivisions, setSubdivisions] = useState([]);
  const [newSubdivision, setNewSubdivision] = useState({ name: '' });
  const [updatedSubdivision, setUpdatedSubdivision] = useState({ id: null, name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddSubdivisionForm, setShowAddSubdivisionForm] = useState(false);
  const [showUpdateSubdivisionForm, setShowUpdateSubdivisionForm] = useState(false);
  const api = useAxios();

  useEffect(() => {
    getSubdivisions();
  }, []);

  const getSubdivisions = async () => {
    try {
      const response = await api.get('/api/subdivisions/');
      if (response.status === 200) {
        setSubdivisions(response.data);
      }
    } catch (error) {
      console.error('Error fetching subdivisions:', error);
    }
  };

  const addSubdivision = async () => {
    try {
      const response = await api.post('/api/subdivisions/', newSubdivision);
      if (response.status === 201) {
        setSubdivisions([...subdivisions, response.data]);
        setNewSubdivision({ name: '' });
        setShowAddSubdivisionForm(false);
      }
    } catch (error) {
      console.error('Error adding subdivision:', error);
    }
  };

  const updateSubdivision = async () => {
    try {
      const response = await api.put(`/api/subdivisions/${updatedSubdivision.id}/`, updatedSubdivision);
      if (response.status === 200) {
        setSubdivisions(subdivisions.map(sub => (sub.id === updatedSubdivision.id ? updatedSubdivision : sub)));
        setShowUpdateSubdivisionForm(false);
        setUpdatedSubdivision({ id: null, name: '' });
      }
    } catch (error) {
      console.error('Error updating subdivision:', error);
    }
  };

  const deleteSubdivision = async (subdivisionId) => {
    try {
      const response = await api.delete(`/api/subdivisions/${subdivisionId}/`);
      if (response.status === 204) {
        setSubdivisions(subdivisions.filter(sub => sub.id !== subdivisionId));
      }
    } catch (error) {
      console.error('Error deleting subdivision:', error);
    }
  };

  const handleSubdivisionInputChange = (event) => {
    const { name, value } = event.target;
    setNewSubdivision({
      ...newSubdivision,
      [name]: value
    });
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedSubdivision({
      ...updatedSubdivision,
      [name]: value
    });
  };

  const handleSubdivisionSubmit = (event) => {
    event.preventDefault();
    addSubdivision();
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    updateSubdivision();
  };

  const filteredSubdivisions = subdivisions.filter(sub => {
    return sub.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Подразделения</h2>
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
        onClick={() => setShowAddSubdivisionForm(!showAddSubdivisionForm)} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {showAddSubdivisionForm ? 'Скрыть Подразделение' : 'Добавить Подразделение'}
      </button>

      {showAddSubdivisionForm && (
        <form onSubmit={handleSubdivisionSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            value={newSubdivision.name}
            placeholder="Название"
            onChange={handleSubdivisionInputChange}
            required
            className="p-2 rounded border border-gray-400 mr-2"
          />
          <button 
            type="submit" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Добавить Подразделение
          </button>
        </form>
      )}

      <ul className="mt-4">
        {filteredSubdivisions.map(subdivision => (
          <li key={subdivision.id} className="mb-4">
            <div className="border border-gray-300 p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{subdivision.name}</h3>
                <div>
                  <button 
                    onClick={() => {
                      setShowUpdateSubdivisionForm(true);
                      setUpdatedSubdivision(subdivision);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Изменить
                  </button>
                  <button 
                    onClick={() => deleteSubdivision(subdivision.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {showUpdateSubdivisionForm && (
        <form onSubmit={handleUpdateSubmit} className="mt-2">
          <input
            type="text"
            name="name"
            value={updatedSubdivision.name}
            placeholder="Название"
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
    </div>
  );
};

export default SubdivisionPage;
