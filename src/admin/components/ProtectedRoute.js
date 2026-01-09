import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { auth, db } from '../../firebase';

// Add 'allowedRoles' prop
const ProtectedRoute = ({ children, allowedRoles }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Fetch role from Firestore 'users' collection
        try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
                setRole(userDoc.data().role); 
            } else {
                setRole('guest'); // Default if no role defined
            }
        } catch (error) {
            console.error("Error fetching role:", error);
            setRole('guest');
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Checking permissions...</div>;

  if (!user) return <Navigate to="/admin/login" replace />;

  // Permission Check: If allowedRoles is passed, check if user's role matches
  if (allowedRoles && !allowedRoles.includes(role)) {
    // User is logged in but doesn't have permission
    return <div style={{padding: '50px', textAlign: 'center'}}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
    </div>;
  }

  return children;
};

export default ProtectedRoute;