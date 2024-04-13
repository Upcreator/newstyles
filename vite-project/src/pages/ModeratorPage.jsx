import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';

const ModeratorPage = () => {
  const [moderators, setModerators] = useState([]);
  const [filteredModerators, setFilteredModerators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newModerator, setNewModerator] = useState({ username: '', email: '', password: '' });
  const [updatedModerator, setUpdatedModerator] = useState({ id: null, username: '', email: '', password: '' });
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  const [showAddModeratorForm, setShowAddModeratorForm] = useState(false); // Add state for add moderator form
  const api = useAxios();

  useEffect(() => {
    getModerators();
  }, []);

  const getModerators = async () => {
    try {
      const response = await api.get('/api/moderators/');
      if (response.status === 200) {
        setModerators(response.data);
        setFilteredModerators(response.data); 
      }
    } catch (error) {
      console.error('Error fetching moderators:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = moderators.filter(moderator => moderator.username.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredModerators(filtered);
  };

  const handleEditClick = (moderator) => {
    setShowUpdateForm(true); 
    setUpdatedModerator(moderator);
  };

  const updateModerator = async () => {
    try {
      const response = await api.patch(`/api/moderators/${updatedModerator.id}/`, {
        username: updatedModerator.username,
        email: updatedModerator.email,
      });
      if (response.status === 200) {
        const updatedModerators = moderators.map(mod => {
          if (mod.id === updatedModerator.id) {
            return { ...mod, username: updatedModerator.username, email: updatedModerator.email };
          }
          return mod;
        });
        setModerators(updatedModerators);
        setFilteredModerators(updatedModerators); 
        setUpdatedModerator({ id: null, username: '', email: '', password: '' });
        setShowUpdateForm(false); 
      }
    } catch (error) {
      console.error('Error updating moderator:', error);
    }
  };

  const addModerator = async () => {
    try {
      const response = await api.post('/api/moderators/', {
        username: newModerator.username,
        email: newModerator.email,
        password: newModerator.password,
      });
      if (response.status === 201) {
        setModerators([...moderators, response.data]);
        setNewModerator({ username: '', email: '', password: '' });
        setShowAddModeratorForm(false);
      }
    } catch (error) {
      console.error('Error adding moderator:', error);
    }
  };

  const deleteModerator = async (moderatorId) => {
    try {
      const response = await api.delete(`/api/moderators/${moderatorId}/`);
      if (response.status === 204) {
        setModerators(moderators.filter(mod => mod.id !== moderatorId));
        setFilteredModerators(filteredModerators.filter(mod => mod.id !== moderatorId));
      }
    } catch (error) {
      console.error('Error deleting moderator:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Модераторы</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Искать по имени пользователя"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 rounded border border-gray-400 mr-2"
        />
      </div>

      {/* Add moderator form */}
      <div className="mt-4">
        <button 
          onClick={() => setShowAddModeratorForm(!showAddModeratorForm)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          {showAddModeratorForm ? 'Скрыть форму добавления' : 'Добавить модератора'}
        </button>

        {showAddModeratorForm && (
          <form onSubmit={addModerator}>
            <input
              type="text"
              name="username"
              value={newModerator.username}
              placeholder="Имя пользователя"
              onChange={(e) => setNewModerator({ ...newModerator, username: e.target.value })}
              required
              className="p-2 rounded border border-gray-400 mr-2"
            />
            <input
              type="email"
              name="email"
              value={newModerator.email}
              placeholder="Email"
              onChange={(e) => setNewModerator({ ...newModerator, email: e.target.value })}
              required
              className="p-2 rounded border border-gray-400 mr-2"
            />
            <input
              type="password"
              name="password"
              value={newModerator.password}
              placeholder="Пароль"
              onChange={(e) => setNewModerator({ ...newModerator, password: e.target.value })}
              required
              className="p-2 rounded border border-gray-400 mr-2"
            />
            <button 
              type="submit" 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Добавить Модератора
            </button>
          </form>
        )}
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 border">Имя пользователя</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredModerators.map(moderator => (
            <tr key={moderator.id}>
              <td className="p-2 border">{moderator.username}</td>
              <td className="p-2 border">{moderator.email}</td>
              <td className="p-2 border">
                <button 
                  onClick={() => handleEditClick(moderator)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Изменить
                </button>
                <button 
                  onClick={() => deleteModerator(moderator.id)} // Call deleteModerator function
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateForm && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Изменить</h3>
          <form onSubmit={updateModerator}>
            <input
              type="text"
              name="username"
              value={updatedModerator.username}
              placeholder="Username"
              onChange={(e) => setUpdatedModerator({ ...updatedModerator, username: e.target.value })}
              required
              className="p-2 rounded border border-gray-400 mr-2"
            />
            <input
              type="email"
              name="email"
              value={updatedModerator.email}
              placeholder="Email"
              onChange={(e) => setUpdatedModerator({ ...updatedModerator, email: e.target.value })}
              required
              className="p-2 rounded border border-gray-400 mr-2"
            />
            <button 
              type="submit" 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Изменить модератора
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModeratorPage;
