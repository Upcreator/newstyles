import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import StudentApplicationImage from '../static/StudentApplicationImage.jpg';

const NotificationApplicationForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        educational_organization: '',
        email: '',
        activity: '',
        agreePolicy: false
    });
    const [educationalOrganizations, setEducationalOrganizations] = useState([]);
    const [activities, setActivities] = useState([]);
    const [canSubmit, setCanSubmit] = useState(false); // State to control form submission
    const api = useAxios();

    useEffect(() => {
        fetchEducationalOrganizations();
        fetchActivities();
    }, []);

    useEffect(() => {
        // Check if all required fields are filled and privacy policy is agreed upon
        const isValid =
            formData.full_name !== '' &&
            formData.educational_organization !== '' &&
            formData.email !== '' &&
            formData.activity !== '' &&
            formData.agreePolicy;

        // Update the state to enable or disable form submission accordingly
        setCanSubmit(isValid);
    }, [formData]);

    const fetchEducationalOrganizations = async () => {
        try {
            const response = await api.get('/api/educational_organizations/');
            setEducationalOrganizations(response.data);
        } catch (error) {
            console.error('Error fetching educational organizations:', error);
        }
    };

    const fetchActivities = async () => {
        try {
            const response = await api.get('/api/activities/');
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/application/notification/', formData);
            console.log(response.data);
            // Clear the form after successful submission
            setFormData({
                full_name: '',
                educational_organization: '',
                email: '',
                activity: '',
                agreePolicy: false
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({ ...formData, [name]: name === 'agreePolicy' ? checked : value });
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
            <div className="md:w-1/2 hidden md:block relative">
                {/* Placeholder image */}
                <img src={StudentApplicationImage} alt="Image" className="object-cover w-full h-full rounded-lg shadow-md" />
                <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
            </div>
            <div className="md:w-1/2 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Заявка на уведомления</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="full_name" className="block text-gray-700 font-semibold">Ваше имя</label>
                        <input type="text" id="full_name" name="full_name" placeholder="ФИО" value={formData.full_name} onChange={handleChange} required className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="educational_organization" className="block text-gray-700 font-semibold">Образовательное Учреждение</label>
                        <select id="educational_organization" name="educational_organization" value={formData.educational_organization} onChange={handleChange} required className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-indigo-500">
                            <option value="">Выбирите Образовательное Учреждение</option>
                            {educationalOrganizations.map(org => (
                                <option key={org.id} value={org.id}>{org.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="activity" className="block text-gray-700 font-semibold">Активность</label>
                        <select id="activity" name="activity" value={formData.activity} onChange={handleChange} required className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-indigo-500">
                            <option value="">Выберите Активность</option>
                            {activities.map(activity => (
                                <option key={activity.id} value={activity.id}>{activity.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="agreePolicy" name="agreePolicy" checked={formData.agreePolicy} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                        <label htmlFor="agreePolicy" className="ml-2 block text-sm text-gray-900">Я соглашаюсь с <a href="https://www.gsprom.ru/politic/" className="text-indigo-600 hover:underline">Политикой конфиденциальности</a></label>
                    </div>
                    <button type="submit" className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!canSubmit && 'opacity-50 cursor-not-allowed'}`} disabled={!canSubmit}>Отправить</button>
                </form>
            </div>
        </div>
    );
};

export default NotificationApplicationForm;
