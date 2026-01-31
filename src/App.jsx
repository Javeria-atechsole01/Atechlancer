import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicFreelancerProfile from './pages/public/PublicFreelancerProfile';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import EmailVerification from './pages/auth/EmailVerification';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';

// Dashboard Imports
// Dashboard Imports
import DashboardLayout from './layouts/DashboardLayout';
import DashboardSettings from './pages/dashboard/DashboardSettings';

import StudentHome from './pages/dashboard/student/StudentHome';
import StudentProfile from './pages/dashboard/student/StudentProfile';
import StudentAssignments from './pages/dashboard/student/StudentAssignments';
import StudentProjects from './pages/dashboard/student/StudentProjects';
import StudentSubmissions from './pages/dashboard/student/StudentSubmissions';
import StudentPayments from './pages/dashboard/student/StudentPayments';

import FreelancerHome from './pages/dashboard/freelancer/FreelancerHome';
import FreelancerGigs from './pages/dashboard/freelancer/FreelancerGigs';
import FreelancerOrders from './pages/dashboard/freelancer/FreelancerOrders';
import FreelancerProfile from './pages/dashboard/freelancer/FreelancerProfile';
import FreelancerEarnings from './pages/dashboard/freelancer/FreelancerEarnings';
import FreelancerReviews from './pages/dashboard/freelancer/FreelancerReviews';

import TeacherHome from './pages/dashboard/teacher/TeacherHome';
import TeacherCourses from './pages/dashboard/teacher/TeacherCourses';
import TeacherMentoring from './pages/dashboard/teacher/TeacherMentoring';
import TeacherJobs from './pages/dashboard/teacher/TeacherJobs';
import TeacherProfile from './pages/dashboard/teacher/TeacherProfile';
import TeacherEarnings from './pages/dashboard/teacher/TeacherEarnings';
import FreelancerAssignments from './pages/dashboard/freelancer/FreelancerAssignments';

import EmployerHome from './pages/dashboard/employer/EmployerHome';
import EmployerPostJob from './pages/dashboard/employer/EmployerPostJob';
import EmployerCandidates from './pages/dashboard/employer/EmployerCandidates';
import EmployerContracts from './pages/dashboard/employer/EmployerContracts';
import EmployerPayments from './pages/dashboard/employer/EmployerPayments';

import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/verify-email" element={<Layout><EmailVerification /></Layout>} />
            <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
            <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />


            {/* Public Profile View (Shared) */}
            <Route path="/profile/freelancer/view" element={<PublicFreelancerProfile />} />

            {/* Dashboard Routes with Shared Layout */}

            {/* Student Dashboard */}
            <Route path="/dashboard/student" element={<DashboardLayout role="student" />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<StudentHome />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="assignments" element={<StudentAssignments />} />
              <Route path="projects" element={<StudentProjects />} />
              <Route path="submissions" element={<StudentSubmissions />} />
              <Route path="payments" element={<StudentPayments />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>

            {/* Freelancer Dashboard */}
            <Route path="/dashboard/freelancer" element={<DashboardLayout role="freelancer" />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<FreelancerHome />} />
              <Route path="profile" element={<FreelancerProfile />} />
              <Route path="gigs" element={<FreelancerGigs />} />
              <Route path="orders" element={<FreelancerOrders />} />
              <Route path="assignments" element={<FreelancerAssignments />} />
              <Route path="earnings" element={<FreelancerEarnings />} />
              <Route path="reviews" element={<FreelancerReviews />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>

            {/* Teacher Dashboard */}
            <Route path="/dashboard/teacher" element={<DashboardLayout role="teacher" />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<TeacherHome />} />
              <Route path="profile" element={<TeacherProfile />} />
              <Route path="courses" element={<TeacherCourses />} />
              <Route path="mentoring" element={<TeacherMentoring />} />
              <Route path="jobs" element={<TeacherJobs />} />
              <Route path="earnings" element={<TeacherEarnings />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>


            {/* Employer Dashboard */}
            <Route path="/dashboard/employer" element={<DashboardLayout role="employer" />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<EmployerHome />} />
              <Route path="post-job" element={<EmployerPostJob />} />
              <Route path="candidates" element={<EmployerCandidates />} />
              <Route path="contracts" element={<EmployerContracts />} />
              <Route path="payments" element={<EmployerPayments />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>

            {/* Fallback for /dashboard/unknown */}
            <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
