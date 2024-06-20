import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import Header from '../components/Header';

const SubdivisionPage = () => {
  const [subdivisions, setSubdivisions] = useState([]);
  const [newSubdivision, setNewSubdivision] = useState({ name: '', department: '' });
  const [updatedSubdivision, setUpdatedSubdivision] = useState({ id: null, name: '', department: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddSubdivisionDrawer, setShowAddSubdivisionDrawer] = useState(false);
  const [showUpdateSubdivisionDrawer, setShowUpdateSubdivisionDrawer] = useState(false);
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
        setNewSubdivision({ name: '', department: '' });
        setShowAddSubdivisionDrawer(false);
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
        setShowUpdateSubdivisionDrawer(false);
        setUpdatedSubdivision({ id: null, name: '', department: '' });
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
    <div>
      <Header />
      <div className={`container mx-auto p-4 ${showAddSubdivisionDrawer || showUpdateSubdivisionDrawer ? 'backdrop' : ''}`}>
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
          onClick={() => setShowAddSubdivisionDrawer(true)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Добавить Подразделение
        </button>

        {/* Drawer for Adding Subdivision */}
        {showAddSubdivisionDrawer && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
            <div className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white w-80 dark:bg-gray-800" tabIndex="-1">
              <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Добавить подразделение</h5>
              <button type="button" onClick={() => setShowAddSubdivisionDrawer(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
              <form className="space-y-6" onSubmit={handleSubdivisionSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newSubdivision.name}
                    onChange={handleSubdivisionInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Введите название"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Департамент</label>
                  <select
                    name="department"
                    id="department"
                    value={newSubdivision.department}
                    onChange={handleSubdivisionInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  >
                    <option value="">Выберите департамент</option>
                    <option value="ГСП">Газтройпром</option>
                    <option value="ГСП 2">ГСП2</option>
                  </select>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Добавить</button>
              </form>
            </div>
          </>
        )}

        <ul>
          {filteredSubdivisions.map(subdivision => (
            <li key={subdivision.id} className="border rounded p-4 mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold">{subdivision.name}</h3>
                  <p className="text-gray-500">{subdivision.department}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      setUpdatedSubdivision(subdivision);
                      setShowUpdateSubdivisionDrawer(true);
                    }} 
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Редактировать
                  </button>
                  <button 
                    onClick={() => deleteSubdivision(subdivision.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Drawer for Updating Subdivision */}
        {showUpdateSubdivisionDrawer && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
            <div className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white w-80 dark:bg-gray-800" tabIndex="-1">
              <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Редактировать подразделение</h5>
              <button type="button" onClick={() => setShowUpdateSubdivisionDrawer(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
              <form className="space-y-6" onSubmit={handleUpdateSubmit}>
                <div>
                  <label htmlFor="updatedName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
                  <input
                    type="text"
                    name="name"
                    id="updatedName"
                    value={updatedSubdivision.name}
                    onChange={handleUpdateInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Введите название"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="updatedDepartment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Департамент</label>
                  <select
                    name="department"
                    id="updatedDepartment"
                    value={updatedSubdivision.department}
                    onChange={handleUpdateInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  >
                    <option value="ГСП">Газтройпром</option>
                    <option value="ГСП 2">ГСП2</option>
                  </select>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Сохранить</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubdivisionPage;

