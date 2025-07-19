import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { API_BASE_URL } from '../api/apiConfig';
import defaultAvatar from '../assets/Images/default-avatar.jpg';
import VerifyDriverModal from '../components/VerifyDriverModal';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const userId = localStorage.getItem('id');
const [secondaryIdImage, setSecondaryIdImage] = useState(null);

const handleSecondaryIdChange = (e) => {
  setSecondaryIdImage(e.target.files[0]);
};


const handleLicenseUpload = async () => {
  const formData = new FormData();
  formData.append('id', userId);
  formData.append('license_image', user.license_image_file);

  const res = await fetch(`${API_BASE_URL}/auth/upload_license.php`, {
    method: 'POST',
    body: formData
  });

  const result = await res.json();
  alert(result.message || 'Uploaded driver’s license');
  window.location.reload();
};

const handleSecondaryIdUpload = async () => {
  const formData = new FormData();
  formData.append('id', userId);
  formData.append('secondary_id_image', secondaryIdImage);

  const res = await fetch(`${API_BASE_URL}/auth/upload_secondary_id.php`, {
    method: 'POST',
    body: formData,
  });
  const result = await res.json();
  alert(result.message || 'Uploaded secondary ID');
  window.location.reload();
};

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/fetch_user.php?id=${userId}`)
      .then(res => res.json())
      .then(setUser)
      .catch(err => console.error(err));
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

  if (user.license_image_file) {
    formData.append('license_image', user.license_image_file);
  }

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
<div className="input-row">
  <label>Driver’s License (Image Only)</label>
  {user.license_image ? (
    <img
     src={`http://localhost/car-rental-api/api/uploads/${user.license_image}`}
      alt="License"
      className="license-preview"
    />
  ) : (
    <p>No license uploaded</p>
  )}
  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setUser((prev) => ({ ...prev, license_image_file: e.target.files[0] }))
    }
  />
  <button onClick={handleLicenseUpload} disabled={!user.license_image_file}>
    Upload License
  </button>
</div>
{user.secondary_id_image && (
  <div className="input-row">
    <label>Uploaded ID:</label>
    <img  
      src={`http://localhost/car-rental-api/api/uploads/${user.secondary_id_image}`}
      alt="Secondary ID"
      style={{ width: '200px', borderRadius: '8px' }}
    />
  </div>
)}
  
<div className="input-row">
  <label>Upload Secondary ID</label>
  <input type="file" onChange={handleSecondaryIdChange} />
  <button onClick={handleSecondaryIdUpload} disabled={!secondaryIdImage}>Upload</button>
</div>


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
          <li>
            Phone number — {user.mobile ? 'Verified' : <button>Verify phone</button>}
          </li>
          <li>
            🪪 Approved to drive — {user.status === 'verified' ? '✅' : (
              <button onClick={() => setShowVerifyModal(true)}>Verify ID</button>
            )}
          </li>
        </ul>
        <p className="tip-text">Build trust with others by verifying your contact details.</p>
      </div>

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
    </div>
  );
};

export default Profile;
