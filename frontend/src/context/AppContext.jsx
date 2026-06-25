import { createContext, useContext, useState, useEffect } from 'react';
import { inquiries as initialInquiries } from '../data/dummyData';
import { generateToken, verifyToken, storeToken, getToken, removeToken } from '../utils/jwt';
import API_BASE_URL from '../config/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark'; // default is dark for luxury brand
  });

  // Auth state — restore from JWT token
  const [currentUser, setCurrentUser] = useState(() => {
    const token = getToken();
    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        const user = {
          email: payload.email,
          role: payload.role,
          name: payload.name,
          agencyName: payload.agencyName,
          phone: payload.phone,
          avatar: payload.avatar,
        };
        // Ensure admin always shows correct name
        if (user.role === 'admin') {
          user.name = 'Rushikesh Deshmukh';
          user.avatar = 'RD';
        }
        return user;
      }
      // Token expired or invalid — clean up
      removeToken();
    }
    return null;
  });

  // Inquiries state
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse inquiries', e);
      }
    }
    return initialInquiries;
  });

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notifications', e);
      }
    }
    return [
      {
        id: 'notif-1',
        title: 'Welcome to Karawaan Portal',
        message: 'Your role-based travel management dashboard is now active.',
        type: 'info',
        time: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
      {
        id: 'notif-2',
        title: 'New Partner Registration',
        message: 'EuroTrail Adventures uploaded 4 new tour packages.',
        type: 'success',
        time: new Date(Date.now() - 7200000).toISOString(),
        read: true,
      }
    ];
  });

  // Toast state
  const [toasts, setToasts] = useState([]);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync inquiries to localStorage
  useEffect(() => {
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Sync notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Sync user to JWT token
  useEffect(() => {
    if (currentUser) {
      const token = generateToken(currentUser);
      storeToken(token);
    } else {
      removeToken();
    }
  }, [currentUser]);

  // Theme toggle
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // JWT-Authenticated Login
  const login = (email, password, role) => {
    let userDetails = {
      email,
      role,
      name: role === 'admin' ? 'Rushikesh Deshmukh' : 'Rajesh Sharma',
      agencyName: role === 'admin' ? 'Karawaan Corporate' : 'Rajesh Travel Studio',
      phone: '+91 98810 75953',
      avatar: role === 'admin' ? 'RD' : 'RS',
    };

    // Generate and store JWT token
    const token = generateToken(userDetails);
    storeToken(token);

    setCurrentUser(userDetails);
    addNotification(`Signed in successfully as ${userDetails.name} (${role === 'admin' ? 'Admin' : 'Travel Agent'}).`, 'success');
    showToast(`Welcome back, ${userDetails.name}!`, 'success');
    return token;
  };

  // Register new user
  const register = (userData) => {
    const { name, email, phone, agencyName, role } = userData;
    // Ensure admin role enforces Rushikesh Deshmukh
    const finalName = role === 'admin' ? 'Rushikesh Deshmukh' : name;
    
    let userDetails = {
      email,
      role,
      name: finalName,
      agencyName: role === 'admin' ? 'Karawaan Corporate' : agencyName,
      phone,
      avatar: role === 'admin' ? 'RD' : finalName.substring(0, 2).toUpperCase(),
    };

    const token = generateToken(userDetails);
    storeToken(token);

    setCurrentUser(userDetails);
    addNotification(`Registered successfully as ${userDetails.name}.`, 'success');
    showToast(`Welcome, ${userDetails.name}!`, 'success');
    return token;
  };

  // Logout — clear JWT
  const logout = () => {
    if (currentUser) {
      addNotification(`${currentUser.name} signed out of the system.`, 'info');
      showToast('Logged out successfully', 'info');
    }
    removeToken();
    setCurrentUser(null);
  };

  // Toast manager
  const showToast = (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Add Notification
  const addNotification = (message, type = 'info', title = 'System Update') => {
    const newNotif = {
      id: `notif-${Math.random().toString(36).substring(2, 9)}`,
      title,
      message,
      type,
      time: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Mark all notifications as read
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Submit Inquiry
  const addInquiry = async (inquiryData) => {
    const newId = `KRW-2026-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
    const newInquiry = {
      id: newId,
      ...inquiryData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      followUpDate: null,
      partner: null
    };

    setInquiries(prev => [newInquiry, ...prev]);
    
    // Add system notification for admin
    addNotification(
      `New traveler inquiry ${newId} submitted by agent ${inquiryData.agentName} for ${inquiryData.destination}.`,
      'info',
      'Inquiry Submitted'
    );

    // Call Backend API to send emails
    try {
      await fetch(`${API_BASE_URL}/api/email/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData),
      });
    } catch (err) {
      console.error('Failed to send email:', err);
      // Optional: showToast('Inquiry saved, but email notification failed.', 'error');
    }

    showToast(`Inquiry ${newId} created successfully!`, 'success');
    return newId;
  };

  // Update Inquiry Status (Admin only)
  const updateInquiryStatus = (id, newStatus, partnerName = null, followUp = null) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return {
          ...inq,
          status: newStatus,
          partner: partnerName || inq.partner,
          followUpDate: followUp || inq.followUpDate
        };
      }
      return inq;
    }));

    const statusLabels = {
      'pending': 'Pending',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'in-progress': 'In Progress'
    };

    addNotification(
      `Inquiry ${id} status has been updated to ${statusLabels[newStatus] || newStatus}.`,
      newStatus === 'approved' ? 'success' : newStatus === 'rejected' ? 'error' : 'info',
      'Inquiry Updated'
    );

    showToast(`Inquiry ${id} updated to ${statusLabels[newStatus] || newStatus}!`, 'success');
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      currentUser,
      login,
      register,
      logout,
      inquiries,
      addInquiry,
      updateInquiryStatus,
      notifications,
      markAllNotificationsRead,
      clearNotifications,
      addNotification,
      toasts,
      showToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
