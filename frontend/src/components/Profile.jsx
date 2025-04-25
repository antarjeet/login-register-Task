import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3600/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data.data);
      } catch (err) {
        setError('Failed to load profile. Please login again.');
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0]; 
    const formattedTime = date.toISOString().split('T')[1].split('.')[0]; 
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Profile</h2>
        {error && <p style={styles.error}>{error}</p>}
        {profile ? (
          <div style={styles.profileInfo}>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Created At:</strong> {formatDateTime(profile.created_at)}</p>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </div>
        ) : (
          <p style={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '500px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  profileInfo: {
    fontSize: '1rem',
    color: '#444',
    lineHeight: '1.8',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 15px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Profile;
