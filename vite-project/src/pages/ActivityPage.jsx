import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import Header from '../components/Header';
const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ name: '' });
  const [updatedActivity, setUpdatedActivity] = useState({ id: null, name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddActivityForm, setShowAddActivityForm] = useState(false);
  const [showUpdateActivityForm, setShowUpdateActivityForm] = useState(false);
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
        setNewActivity({ name: '' });
        setShowAddActivityForm(false);
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
        setShowUpdateActivityForm(false);
        setUpdatedActivity({ id: null, name: '' });
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

  const filteredActivities = activities.filter(act => {
    return act.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
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
        <button 
          onClick={() => setShowAddActivityForm(!showAddActivityForm)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          {showAddActivityForm ? 'Скрыть активности' : 'Добавить активности'}
        </button>

        {showAddActivityForm && (
          <form onSubmit={handleActivitySubmit} className="mb-4">
            <input
              type="text"
              name="name"
              value={newActivity.name}
              placeholder="Название"
              onChange={handleActivityInputChange}
              required
              className="p-2 rounded border border-gray-400 mr-2"
            />
            <button 
              type="submit" 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Добавить Активность
            </button>
          </form>
        )}

        <ul className="mt-4">
          {filteredActivities.map(activity => (
            <li key={activity.id} className="mb-4">
              <div className="border border-gray-300 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{activity.name}</h3>
                  <div>
                    <button 
                      onClick={() => {
                        setShowUpdateActivityForm(true);
                        setUpdatedActivity(activity);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Изменить
                    </button>
                    <button 
                      onClick={() => deleteActivity(activity.id)}
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

        {showUpdateActivityForm && (
          <form onSubmit={handleUpdateSubmit} className="mt-2">
            <input
              type="text"
              name="name"
              value={updatedActivity.name}
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
    </div>
  );
};

export default ActivityPage;
