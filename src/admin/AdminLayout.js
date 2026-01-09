import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Admin.css'; 

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add firebase signout logic here later
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">JEC Admin</div>
        
        <nav className="admin-nav">
          <p className="menu-label">Dashboard</p>
          <Link to="/admin" className="nav-item">Overview</Link>
          
          <p className="menu-label">Page Content</p>
          <Link to="/admin/edit-home" className="nav-item">Home Page</Link>
          
          <p className="menu-label">Dynamic Updates</p>
          <Link to="/admin/manage-blogs" className="nav-item">Blogs & News</Link>
          <Link to="/admin/manage-gallery" className="nav-item">Gallery Manager</Link>
          <Link to="/admin/manage-faculty" className="nav-item">Faculty Members</Link>
          <Link to="/admin/manage-testimonials" className="nav-item">Testimonials</Link>
          <Link to="/admin/manage-departments" className="nav-item">Departments</Link>
          <Link to="/admin/manage-videos" className="nav-item">Video Gallery</Link>
                  <Link to="/admin/manage-placements" className="nav-item">Placements</Link> {/* <-- ADDED */}
                  <Link to="/admin/manage-campus-life" className="nav-item">Campus Life</Link> {/* <-- ADDED */}
                      <Link to="/admin/manage-video-testimonials" className="nav-item">Video Testimonials</Link>

          <p className="menu-label">Settings</p>
          <Link to="/admin/users" className="nav-item">User Management</Link>
        </nav>

        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;