import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import Header from '../components/Header';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ name: '', type: '' });
  const [updatedActivity, setUpdatedActivity] = useState({ id: null, name: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showAddActivityDrawer, setShowAddActivityDrawer] = useState(false);
  const [showUpdateActivityDrawer, setShowUpdateActivityDrawer] = useState(false);
  const api = useAxios();

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    try {
      const response = await api.get('/api/activities/');
      if (response.status === 200) {
        setActivities(response.data);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const addActivity = async () => {
    try {
      const response = await api.post('/api/activities/', newActivity);
      if (response.status === 201) {
        setActivities([...activities, response.data]);
        setNewActivity({ name: '', type: '' });
        setShowAddActivityDrawer(false);
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const updateActivity = async () => {
    try {
      const response = await api.put(`/api/activities/${updatedActivity.id}/`, updatedActivity);
      if (response.status === 200) {
        setActivities(activities.map(act => (act.id === updatedActivity.id ? updatedActivity : act)));
        setShowUpdateActivityDrawer(false);
        setUpdatedActivity({ id: null, name: '', type: '' });
      }
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      const response = await api.delete(`/api/activities/${activityId}/`);
      if (response.status === 204) {
        setActivities(activities.filter(act => act.id !== activityId));
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleActivityInputChange = (event) => {
    const { name, value } = event.target;
    setNewActivity({
      ...newActivity,
      [name]: value
    });
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedActivity({
      ...updatedActivity,
      [name]: value
    });
  };

  const handleActivitySubmit = (event) => {
    event.preventDefault();
    addActivity();
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    updateActivity();
  };

  const showUpdateForm = (activity) => {
    setUpdatedActivity(activity);
    setShowUpdateActivityDrawer(true);
  };

  const filteredActivities = activities.filter(act => {
    return (
      (selectedType === '' || act.type === selectedType) &&
      act.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <Header />
      <div className={`container mx-auto p-4 ${showAddActivityDrawer || showUpdateActivityDrawer ? 'backdrop' : ''}`}>
        <h2 className="text-2xl font-bold mb-4">Активности</h2>
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
            <option value="Нефтегазовая">Нефтегазовая</option>
            <option value="Офисная">Офисная</option>
          </select>
        </div>

        <button 
          onClick={() => setShowAddActivityDrawer(true)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Добавить Активность
        </button>

        {/* Drawer for Adding Activity */}
        {showAddActivityDrawer && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
            <div className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white w-80 dark:bg-gray-800" tabIndex="-1">
              <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Добавить активность</h5>
              <button type="button" onClick={() => setShowAddActivityDrawer(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
              <form className="space-y-6" onSubmit={handleActivitySubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newActivity.name}
                    onChange={handleActivityInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Введите название"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тип</label>
                  <select
                    name="type"
                    id="type"
                    value={newActivity.type}
                    onChange={handleActivityInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  >
                    <option value="">Выберите тип</option>
                    <option value="Нефтегазовая">Нефтегазовая</option>
                    <option value="Офисная">Офисная</option>
                  </select>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Добавить</button>
              </form>
            </div>
          </>
        )}

        <ul>
          {filteredActivities.map(activity => (
            <li key={activity.id} className="border rounded p-4 mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold">{activity.name}</h3>
                  <p className="text-gray-500">{activity.type}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => showUpdateForm(activity)} 
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Редактировать
                  </button>
                  <button 
                    onClick={() => deleteActivity(activity.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Удалить
                  </button>
                </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Drawer for Updating Activity */}
        {showUpdateActivityDrawer && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
            <div className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white w-80 dark:bg-gray-800" tabIndex="-1">
              <h5 className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Редактировать активность</h5>
              <button type="button" onClick={() => setShowUpdateActivityDrawer(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
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
                    value={updatedActivity.name}
                    onChange={handleUpdateInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Введите название"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="updatedType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тип</label>
                  <select
                    name="type"
                    id="updatedType"
                    value={updatedActivity.type}
                    onChange={handleUpdateInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  >
                    <option value="Нефтегазовая">Нефтегазовая</option>
                    <option value="Офисная">Офисная</option>
                  </select>
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Сохранить</button>
              </form>
            </div>
          </>
        )}
      </div>
  );
};

export default ActivityPage;

