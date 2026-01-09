import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; 
import './App.css';

// Layouts
import Layout from './components/Layout';
import AdminLayout from './admin/AdminLayout';

// Auth Components
import ProtectedRoute from './admin/components/ProtectedRoute';
import MoocsNptel from './pages/MoocsNptel';
import MTech from './pages/MTech';

import GrievanceRedressal from './pages/GrievanceRedressal';


// --- LAZY IMPORT PAGES ---
const Home = lazy(() => import('./pages/Home'));
const AdmissionEnquiry = lazy(() => import('./pages/AdmissionEnquiry'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Placements = lazy(() => import('./pages/Placements'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Faq = lazy(() => import('./pages/Faq'));

// JEC Dropdown
const Management = lazy(() => import('./pages/Management'));
const HumanNetwork = lazy(() => import('./pages/HumanNetwork'));
const IIC = lazy(() => import('./pages/IIC'));
const Alumni = lazy(() => import('./pages/Alumni'));
const Employment = lazy(() => import('./pages/Employment'));
const AntiRagging = lazy(() => import('./pages/AntiRagging'));
const Testimonials = lazy(() => import('./pages/Testimonials'));

// Society Dropdown
const JCES = lazy(() => import('./pages/JCES'));
const AgrasenCollege = lazy(() => import('./pages/AgrasenCollege'));

// Programs / Infrastructure Dropdown
const CoursesOffered = lazy(() => import('./pages/CoursesOffered'));
const EngineeringProjects = lazy(() => import('./pages/EngineeringProjects'));
const AcademicAchievers = lazy(() => import('./pages/AcademicAchievers'));
const Department = lazy(() => import('./pages/Department'));
const Foundation = lazy(() => import('./pages/Foundation'));
const KeyTeamsFunctions = lazy(() => import('./pages/KeyTeamsFunctions'));
const LearningByDoing = lazy(() => import('./pages/LearningByDoing'));
const PrepareAndPresent = lazy(() => import('./pages/PrepareAndPresent'));
const RefuelAndRelax = lazy(() => import('./pages/RefuelAndRelax'));
const VibrantIndia = lazy(() => import('./pages/VibrantIndia'));
const MentalHealth = lazy(() => import('./pages/MentalHealth'));
const KarmaCourses = lazy(() => import('./pages/KarmaCourses'));
const ConvenienceAndSafety = lazy(() => import('./pages/ConvenienceAndSafety'));

// Admissions Dropdown
const AdmissionProcedure = lazy(() => import('./pages/AdmissionProcedure'));
const FeeStructure = lazy(() => import('./pages/FeeStructure'));
const DocumentsRequired = lazy(() => import('./pages/DocumentsRequired'));
const Reap2025 = lazy(() => import('./pages/Reap2025'));
const FinancialAids = lazy(() => import('./pages/FinancialAids'));
const AdmissionOpen = lazy(() => import('./pages/AdmissionOpen'));

// Campus Dropdown
const StudentsCorner = lazy(() => import('./pages/StudentsCorner'));
const CampusLife = lazy(() => import('./components/CampusLife')); 
const VideoGallery = lazy(() => import('./pages/VideoGallery'));
const Gallery = lazy(() => import('./pages/Gallery'));
const MandatoryDisclosure = lazy(() => import('./pages/MandatoryDisclosure'));

// --- ADDED MISSING IMPORTS ---
const CommitteesZone = lazy(() => import('./pages/CommitteesZone'));
const GamesAndSports = lazy(() => import('./pages/GamesAndSports'));
const GutsNGlory = lazy(() => import('./pages/GutsNGlory'));

// Blog
const Blog = lazy(() => import('./pages/Blog'));
const SinglePost = lazy(() => import('./pages/SinglePost'));

// --- ADMIN PAGES ---
const Login = lazy(() => import('./admin/pages/Login'));
const Overview = lazy(() => import('./admin/pages/Overview'));
const EditHero = lazy(() => import('./admin/pages/EditHero'));
const EditBlog = lazy(() => import('./admin/pages/EditBlog'));
const EditFaculty = lazy(() => import('./admin/pages/EditFaculty'));
const EditTestimonials = lazy(() => import('./admin/pages/EditTestimonials'));
const EditDepartment = lazy(() => import('./admin/pages/EditDepartment'));
const EditVideoGallery = lazy(() => import('./admin/pages/EditVideoGallery'));
const EditGallery = lazy(() => import('./admin/pages/EditGallery'));
const EditPlacements = lazy(() => import('./admin/pages/EditPlacements'));
const UserManagement = lazy(() => import('./admin/pages/UserManagement'));
const ManageCampusLife = lazy(() => import('./admin/pages/ManageCampusLife'));
const ManageVideoTestimonials = lazy(() => import('./admin/pages/ManageVideoTestimonials'));

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="admission-enquiry" element={<AdmissionEnquiry />} />
              <Route path="admissions" element={<Admissions />} />
              <Route path="placement" element={<Placements />} /> {/* Matches Subheader */}
                          <Route path="contact-us" element={<Contact />} /> {/* Matches Subheader */}
                          <Route path="/grievance" element={<GrievanceRedressal />} />

              {/* JEC Dropdown (Updated paths to match Subheader.js) */}
              <Route path="jec/JEC-FAQ" element={<Faq />} />
              <Route path="jec/Employment-JEC" element={<Employment />} />
              <Route path="jec/About-JEC" element={<About />} />
              <Route path="jec/Students-Testimonials" element={<Testimonials />} />
              <Route path="jec/Alumni" element={<Alumni />} />
              <Route path="jec/network" element={<HumanNetwork />} />
              <Route path="jec/Anti-Ragging-Committee" element={<AntiRagging />} />
              <Route path="jec/Institution-Innovation-Council-JEC" element={<IIC />} />
              <Route path="jec/Management" element={<Management />} />

              {/* Admission Dropdown (Updated paths) */}
              <Route path="admission/Documents-Required" element={<DocumentsRequired />} />
              <Route path="admission/Courses-Offered" element={<CoursesOffered />} />
              <Route path="admission/Fee-Structure" element={<FeeStructure />} />
              <Route path="admission/Mandatory-Disclosure" element={<MandatoryDisclosure />} />
              <Route path="admission/Financial-Aids-Bank-Loans" element={<FinancialAids />} />
              <Route path="admission/REAP-2025" element={<Reap2025 />} />
              <Route path="admission/btech-admissions" element={<AdmissionOpen />} />
              <Route path="admission/Skill-Courses-JEC" element={<KarmaCourses />} />
              <Route path="admission/Admission-Procedure" element={<AdmissionProcedure />} />

              {/* Infrastructure Dropdown (Updated paths) */}
              <Route path="Infrastructure/Convenience-and-Safety" element={<ConvenienceAndSafety />} />
              <Route path="Infrastructure/Learning-By-Doing" element={<LearningByDoing />} />
              <Route path="Infrastructure/Prepare-and-Present" element={<PrepareAndPresent />} />
              <Route path="Infrastructure/Refuel-and-Relax" element={<RefuelAndRelax />} />

              {/* Our Society Dropdown (Updated paths) */}
              <Route path="Our-Society/Foundation-for-Better-Tomorrow" element={<Foundation />} />
              <Route path="Our-Society/Other-Institutes-Agrasen-College" element={<AgrasenCollege />} />
              <Route path="Our-Society/Other-Institutes-Jaipur-College-of-Education-and-Science" element={<JCES />} />
              <Route path="Our-Society/Key-Teams-Functions" element={<KeyTeamsFunctions />} />

              {/* Campus Life Dropdown (Updated paths) */}
              <Route path="Gallery" element={<Gallery />} />
              <Route path="Gallery/:albumId?" element={<Gallery />} />
              <Route path="campus-life/jec-vibrant-india" element={<VibrantIndia />} />
              <Route path="campus-life/committees-zone" element={<CommitteesZone />} />
              <Route path="campus-life/video-gallery" element={<VideoGallery />} />
              <Route path="campus-life/engineering-projects" element={<EngineeringProjects />} />
              <Route path="campus-life/academic-achievers" element={<AcademicAchievers />} />
              <Route path="campus-life/mental-health" element={<MentalHealth />} />
              <Route path="campus-life/students-corner" element={<StudentsCorner />} />
              <Route path="campus-life/games-and-sports" element={<GamesAndSports />} />
              <Route path="campus-life/guts-n-glory" element={<GutsNGlory />} />

                          <Route path="JEC-engineering/MOOCS-NPTEL-SWAYAM" element={<MoocsNptel />} />
                          <Route path="JEC-engineering/MTech" element={<MTech />} />

              {/* Blog */}
              <Route path="blog" element={<Blog />} />
<Route path="blog/:slug" element={<SinglePost />} />

              {/* Dynamic Department Route */}
              <Route path="JEC-engineering/:departmentId" element={<Department />} />
            </Route>

            {/* Login Route */}
            <Route path="/admin/login" element={<Login />} />

            {/* --- ADMIN ROUTES --- */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'editor']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
                <Route index element={<Overview />} />
                <Route path="edit-home" element={<EditHero />} />
                <Route path="manage-blogs" element={<EditBlog />} />
                <Route path="manage-faculty" element={<EditFaculty />} />
                <Route path="manage-testimonials" element={<EditTestimonials />} />
                <Route path="manage-departments" element={<EditDepartment />} />
                <Route path="manage-videos" element={<EditVideoGallery />} />
                <Route path="manage-gallery" element={<EditGallery />} />
                          <Route path="manage-placements" element={<EditPlacements />} />
                          <Route path="manage-campus-life" element={<ManageCampusLife />} />
                          <Route path="manage-video-testimonials" element={<ManageVideoTestimonials />} />

                <Route 
                  path="users" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <UserManagement />
                    </ProtectedRoute>
                  } 
                />
            </Route>

            {/* Fallback for broken links (prevents white screen) */}
            <Route path="*" element={<div style={{padding: "100px", textAlign: "center"}}><h1>404 - Page Not Found</h1></div>} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;