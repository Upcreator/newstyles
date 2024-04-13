import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import EducationalOrganizationPage from './pages/EducationalOrganizationPage'
import SubdivisionPage from './pages/SubdivisionPage'
import ActivityPage from './pages/ActivityPage'
import PracticePage from './pages/PracticePage'
import ApplicationForm from './pages/ApplicationFormPage'
import NotificationApplicationForm from './pages/NotificationApplicationForm'
import StudetnApplicationList from './pages/StudentApplicationList'
import ModeratorPage from './pages/ModeratorPage'


import Header from './components/Header'

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/applications" element={<ApplicationForm />} />
              <Route path="/notification" element={<NotificationApplicationForm />} />
            </Routes>
          <Header />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomePage />} exact/>
              <Route path="/subdivisions" element={<SubdivisionPage />} />
              <Route path="/educational_organizations" element={<EducationalOrganizationPage />} />
              <Route path="/activities" element={<ActivityPage />} />
              <Route path="/practices" element={<PracticePage />} />
              <Route path="/appication_list" element={<StudetnApplicationList />} />
              <Route path="/moderators" element={<ModeratorPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
