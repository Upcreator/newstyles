import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import Header from '../components/Header';

const PracticePage = () => {
  const [practices, setPractices] = useState([]);
  const [newPractice, setNewPractice] = useState({ name: '', subdivision: '', activity: [], isActive: true });
  const [subdivisions, setSubdivisions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showAddPracticeForm, setShowAddPracticeForm] = useState(false);
  const [editModePracticeId, setEditModePracticeId] = useState(null);
  const [updatedPractice, setUpdatedPractice] = useState({});

  const api = useAxios();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [practicesResponse, subdivisionsResponse, activitiesResponse] = await Promise.all([
        api.get('/api/practices/'),
        api.get('/api/subdivisions/'),
        api.get('/api/activities/')
      ]);

      if (practicesResponse.status === 200) {
        setPractices(practicesResponse.data);
      }

      if (subdivisionsResponse.status === 200) {
        setSubdivisions(subdivisionsResponse.data);
      }

      if (activitiesResponse.status === 200) {
        setActivities(activitiesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addPractice = async () => {
    try {
      const response = await api.post('/api/practices/', newPractice);
      if (response.status === 201) {
        setPractices([...practices, response.data]);
        setNewPractice({ name: '', subdivision: '', activity: [], isActive: true });
        setShowAddPracticeForm(false);
      }
    } catch (error) {
      console.error('Error adding practice:', error);
    }
  };

  const updatePractice = async () => {
    try {
      const response = await api.put(`/api/practices/${updatedPractice.id}/`, updatedPractice);
      if (response.status === 200) {
        setPractices(practices.map(practice => (practice.id === updatedPractice.id ? updatedPractice : practice)));
        setEditModePracticeId(null);
      }
    } catch (error) {
      console.error('Error updating practice:', error);
    }
  };

  const deletePractice = async (practiceId) => {
    try {
      const response = await api.delete(`/api/practices/${practiceId}/`);
      if (response.status === 204) {
        setPractices(practices.filter(practice => practice.id !== practiceId));
      }
    } catch (error) {
      console.error('Error deleting practice:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked, options } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    const selectedOptions = Array.from(options || [])
      .filter(option => option.selected)
      .map(option => option.value);
    setNewPractice({
      ...newPractice,
      [name]: name === 'activity' ? selectedOptions : inputValue
    });
  };

  const handleUpdateInputChange = (event) => {
    const { name, value, type, checked, options } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    const selectedOptions = Array.from(options || [])
      .filter(option => option.selected)
      .map(option => option.value);
    setUpdatedPractice({
      ...updatedPractice,
      [name]: name === 'activity' ? selectedOptions : inputValue
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPractice();
  };

  const handleEditButtonClick = (practiceId) => {
    if (editModePracticeId === practiceId) {
      setEditModePracticeId(null);
    } else {
      setEditModePracticeId(practiceId);
      const practiceToUpdate = practices.find(practice => practice.id === practiceId);
      setUpdatedPractice(practiceToUpdate);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Практики</h2>
        <button onClick={() => setShowAddPracticeForm(!showAddPracticeForm)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          {showAddPracticeForm ? 'Скрыть Практику' : 'Добавить Практику'}
        </button>
    
        {showAddPracticeForm && (
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              name="name"
              value={newPractice.name}
              placeholder="Название"
              onChange={handleInputChange}
              required
              className="p-2 rounded border border-gray-400 mr-2"
            />
            <select name="subdivision" value={newPractice.subdivision} onChange={handleInputChange} required className="p-2 rounded border border-gray-400 mr-2">
              <option value="">Выбирите подразделение</option>
              {subdivisions.map(subdivision => (
                <option key={subdivision.id} value={subdivision.id}>{subdivision.name}</option>
              ))}
            </select>
            <select name="activity" multiple value={newPractice.activity} onChange={handleInputChange} required className="p-2 rounded border border-gray-400 mr-2">
              {activities.map(activity => (
                <option key={activity.id} value={activity.id}>{activity.name}</option>
              ))}
            </select>
            <label className="flex items-center mr-2">
              <input type="checkbox" name="isActive" checked={newPractice.isActive} onChange={handleInputChange} className="mr-2" />
              <span>Активна</span>
            </label>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Добавить Практику
            </button>
          </form>
        )}
    
        <ul>
          {practices.map(practice => (
            <li key={practice.id} className="bg-gray-200 border border-gray-300 rounded-md p-4 mb-4">
              <div className="flex justify-between mb-2">
                <div className="font-bold">{practice.name}</div>
                <div>
                  <button onClick={() => handleEditButtonClick(practice.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                    {editModePracticeId === practice.id ? 'Закрыть' : 'Изменить'}
                  </button>
                  <button onClick={() => deletePractice(practice.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Удалить
                  </button>
                </div>
              </div>
              {editModePracticeId === practice.id ? (
                <div className="flex flex-col">
                  <input type="text" name="name" value={updatedPractice.name} onChange={handleUpdateInputChange} className="p-2 rounded border border-gray-400 mb-2" />
                  <select name="subdivision" value={updatedPractice.subdivision} onChange={handleUpdateInputChange} className="p-2 rounded border border-gray-400 mb-2">
                    <option value="">Выбирите подразделение</option>
                    {subdivisions.map(subdivision => (
                      <option key={subdivision.id} value={subdivision.id}>{subdivision.name}</option>
                    ))}
                  </select>
                  <select name="activity" multiple value={updatedPractice.activity} onChange={handleUpdateInputChange} className="p-2 rounded border border-gray-400 mb-2">
                    {activities.map(activity => (
                      <option key={activity.id} value={activity.id}>{activity.name}</option>
                    ))}
                  </select>
                  <label className="flex items-center mb-2">
                    <input type="checkbox" name="isActive" checked={updatedPractice.isActive} onChange={handleUpdateInputChange} className="mr-2" />
                    <span>Активна</span>
                  </label>
                  <button onClick={updatePractice} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Обновить
                  </button>
                </div>
              ) : (
                <div>
                  {/* Display practice details */}
                  <div className="font-semibold">Подразделение: {subdivisions.find(sub => sub.id === practice.subdivision)?.name || 'Not Assigned'}</div>
                  <div className="font-semibold">Активности: {practice.activity.length > 0 ? practice.activity.map(activityId => activities.find(act => act.id === activityId)?.name).join(', ') : 'Not Assigned'}</div>
                  <div className="font-semibold">Статус: {practice.isActive ? 'Активна' : 'Не активна'}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );  
};

export default PracticePage;
