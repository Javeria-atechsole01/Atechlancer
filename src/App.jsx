import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicFreelancerProfile from './pages/public/PublicFreelancerProfile';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import WhyAtechlancer from './pages/WhyAtechlancer';
import FAQ from './pages/FAQ';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import EmailVerification from './pages/auth/EmailVerification';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Gigs from './pages/Gigs';
import GigDetails from './pages/GigDetails';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import ProjectHub from './pages/ProjectHub';
import ProjectDetails from './pages/ProjectDetails';
import StudentPostProject from './pages/dashboard/student/StudentPostProject';
import AssignmentLanding from './pages/assignments/AssignmentLanding';
import AssignmentFeed from './pages/assignments/AssignmentFeed';
import AssignmentDetails from './pages/assignments/AssignmentDetails';
import PostAssignment from './pages/dashboard/student/PostAssignment';
import SubmissionUpload from './pages/assignments/SubmissionUpload';

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
import StudentApplications from './pages/dashboard/student/StudentApplications';

import FreelancerHome from './pages/dashboard/freelancer/FreelancerHome';
import FreelancerGigs from './pages/dashboard/freelancer/FreelancerGigs';
import FreelancerGigsManager from './pages/dashboard/freelancer/FreelancerGigsManager';
import FreelancerOrders from './pages/dashboard/freelancer/FreelancerOrders';
import FreelancerProfile from './pages/dashboard/freelancer/FreelancerProfile';
import FreelancerEarnings from './pages/dashboard/freelancer/FreelancerEarnings';
import FreelancerReviews from './pages/dashboard/freelancer/FreelancerReviews';
import FreelancerApplications from './pages/dashboard/freelancer/FreelancerApplications';

import TeacherHome from './pages/dashboard/teacher/TeacherHome';
import TeacherCourses from './pages/dashboard/teacher/TeacherCourses';
import TeacherMentoring from './pages/dashboard/teacher/TeacherMentoring';
import TeacherJobs from './pages/dashboard/teacher/TeacherJobs';
import TeacherProfile from './pages/dashboard/teacher/TeacherProfile';
import TeacherEarnings from './pages/dashboard/teacher/TeacherEarnings';
import FreelancerAssignments from './pages/dashboard/freelancer/FreelancerAssignments';

import EmployerHome from './pages/dashboard/employer/EmployerHome';
import EmployerPostJob from './pages/dashboard/employer/EmployerPostJob';
import EmployerEditJob from './pages/dashboard/employer/EmployerEditJob';
import EmployerCandidates from './pages/dashboard/employer/EmployerCandidates';
import EmployerContracts from './pages/dashboard/employer/EmployerContracts';
import EmployerPayments from './pages/dashboard/employer/EmployerPayments';
import AdminPayments from './pages/dashboard/admin/AdminPayments';
import EmployerApplications from './pages/dashboard/employer/EmployerApplications';

import ApplyJob from './pages/ApplyJob';

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
            <Route path="/why-atechlancer" element={<Layout><WhyAtechlancer /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
            <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            <Route path="/gigs" element={<Layout><Gigs /></Layout>} />
            <Route path="/gigs/:id" element={<Layout><GigDetails /></Layout>} />
            <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
            <Route path="/jobs/:id" element={<Layout><JobDetails /></Layout>} />
            <Route path="/jobs/:id/apply" element={<Layout><ApplyJob /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/verify-email" element={<Layout><EmailVerification /></Layout>} />
            <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
            <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
            <Route path="/orders" element={<ProtectedRoute><Layout><Orders /></Layout></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><Layout><OrderDetails /></Layout></ProtectedRoute>} />
            <Route path="/projects" element={<Layout><ProjectHub /></Layout>} />
            <Route path="/projects/:id" element={<Layout><ProjectDetails /></Layout>} />

            {/* Assignment Marketplace Routes */}
            <Route path="/assignments" element={<Layout><AssignmentLanding /></Layout>} />
            <Route path="/assignments/feed" element={<Layout><AssignmentFeed /></Layout>} />
            <Route path="/assignments/:id" element={<Layout><AssignmentDetails /></Layout>} />
            <Route path="/assignments/:id/submit" element={<Layout><SubmissionUpload /></Layout>} />
            <Route path="/dashboard/student/post-assignment" element={<ProtectedRoute><Layout><PostAssignment /></Layout></ProtectedRoute>} />

            {/* Project Upload Route */}
            <Route path="/dashboard/student/projects/new" element={<Layout><StudentPostProject /></Layout>} />


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
              <Route path="applications" element={<StudentApplications />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>

            {/* Freelancer Dashboard */}
            <Route path="/dashboard/freelancer" element={<DashboardLayout role="freelancer" />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<FreelancerHome />} />
              <Route path="profile" element={<FreelancerProfile />} />
              <Route path="gigs" element={<FreelancerGigs />} />
              <Route path="manage-gigs" element={<FreelancerGigsManager />} />
              <Route path="orders" element={<FreelancerOrders />} />
              <Route path="assignments" element={<FreelancerAssignments />} />
              <Route path="earnings" element={<FreelancerEarnings />} />
              <Route path="reviews" element={<FreelancerReviews />} />
              <Route path="applications" element={<FreelancerApplications />} />
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
              <Route path="jobs/edit/:id" element={<EmployerEditJob />} />
              <Route path="candidates" element={<EmployerCandidates />} />
              <Route path="contracts" element={<EmployerContracts />} />
              <Route path="payments" element={<EmployerPayments />} />
              <Route path="applications" element={<EmployerApplications />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>

            {/* Admin Dashboard */}
            <Route path="/dashboard/admin" element={<DashboardLayout role="admin" />}>
              <Route index element={<Navigate to="payments" replace />} />
              <Route path="payments" element={<AdminPayments />} />
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
