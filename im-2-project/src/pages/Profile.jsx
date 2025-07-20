// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { API_BASE_URL } from '../api/apiConfig';
import defaultAvatar from '../assets/Images/default-avatar.jpg';
import VerifyDriverModal from '../components/VerifyDriverModal';
import PendingVerificationView from '../components/PendingVerificationView';



const Profile = () => {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const userId = localStorage.getItem('id');
 const [hasPendingApplication, setHasPendingApplication] = useState(false);
 const [showPendingView, setShowPendingView] = useState(false);


  useEffect(() => {
  // Fetch user profile info
  fetch(`${API_BASE_URL}/auth/fetch_user.php?id=${userId}`)
    .then(res => res.json())
    .then(setUser)
    .catch(err => console.error(err));

  // Check if the user has submitted a verification application
  fetch(`${API_BASE_URL}/auth/fetch_user_application_form.php?user_id=${userId}`)
    .then(async (res) => {
      if (!res.ok) {
        setHasPendingApplication(false);
        return;
      }
      const data = await res.json();
      setHasPendingApplication(data && Object.keys(data).length > 0);
    })
    .catch(() => {
      setHasPendingApplication(false);
    });
}, []);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handlePhotoSave = async () => {
    const formData = new FormData();
    formData.append('id', userId);
    if (photo) formData.append('profile_photo', photo);

    const res = await fetch(`${API_BASE_URL}/auth/update_photo.php`, {
      method: 'POST',
      body: formData
    });
    const result = await res.json();
    alert(result.message || 'Photo updated');
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('mobile', user.mobile || '');
    formData.append('address', user.address || '');

    const res = await fetch(`${API_BASE_URL}/auth/update_user.php`, {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    alert(result.message || 'Updated');
    setIsSaving(false);
    window.location.reload();
  };

  if (!user) return <p>Loading...</p>;

  const fullName = `${user.first_name} ${user.middle_name ?? ''} ${user.last_name}`.trim();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-photo">
          <img
            src={user.profile_photo ? `http://localhost/car-rental-api/api/uploads/${user.profile_photo}` : defaultAvatar}
            alt="Profile"
          />
          <input type="file" onChange={handlePhotoChange} />
          <button onClick={handlePhotoSave} disabled={!photo}>Save Photo</button>
        </div>
        <div className="profile-info">
          <h2>{fullName}</h2>
          <p>Joined {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
        </div>
      </div>

      <div className="profile-edit-section">
        <h3>Account Info</h3>
        <div className="input-row">
          <label>Email</label>
          <input type="email" value={user.email || ''} disabled />
        </div>
        <div className="input-row">
          <label>Mobile</label>
          <input name="mobile" value={user.mobile || ''} onChange={handleInputChange} />
        </div>

        {user.license_image && (
          <div className="input-row">
            <label>Driver’s License</label>
            <img
              src={`http://localhost/car-rental-api/api/uploads/${user.license_image}`}
              alt="License"
              className="license-preview"
            />
          </div>
        )}

        {user.secondary_id_image && (
          <div className="input-row">
            <label>Secondary ID</label>
            <img
              src={`http://localhost/car-rental-api/api/uploads/${user.secondary_id_image}`}
              alt="Secondary ID"
              className="license-preview"
            />
          </div>
        )}

  

        <div className="input-row">
          <label>Address</label>
          <textarea name="address" value={user.address || ''} onChange={handleInputChange}></textarea>
        </div>

        <button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
<div className="profile-verification">
  <h3>Verified Info</h3>
  <ul>
    <li>✅ Email address</li>
    <li>Phone number — {user.mobile ? 'Verified' : <button>Verify phone</button>}</li>
   <li>
  🪪 Approved to drive — {
    user.status === 'verified' ? '✅' :
    hasPendingApplication ? '🕒 Pending' :
    <button onClick={() => setShowVerifyModal(true)}>Verify ID</button>
  }
</li>
  </ul>
  <p className="tip-text">Build trust with others by verifying your contact details.</p>
</div>
{user.status !== 'verified' && hasPendingApplication && (
  <div className="profile-pending-application">
    <button onClick={() => setShowPendingView(true)}>View Your Submitted Application</button>
    <button onClick={() => {
      const confirm = window.confirm("Are you sure you want to submit a new application? This will replace your previous one.");
      if (confirm) {
        setShowVerifyModal(true); // Opens modal for new submission
      }
    }}>
      Submit New Application
    </button>
  </div>
)}

      {showVerifyModal && (
        <VerifyDriverModal
          userId={userId}
          onClose={() => setShowVerifyModal(false)}
          refreshUser={() => {
            fetch(`${API_BASE_URL}/auth/fetch_user.php?id=${userId}`)
              .then(res => res.json())
              .then(setUser);
          }}
        />
      )}
      

{showPendingView && (
  <PendingVerificationView
    userId={userId}
    onClose={() => setShowPendingView(false)}
  />
)}

    </div>
  );
};

export default Profile;
