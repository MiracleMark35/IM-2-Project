import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { API_BASE_URL } from '../api/apiConfig';
import defaultAvatar from '../assets/Images/default-avatar.jpg';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/fetch_user.php?id=${userId}`)
      .then(res => res.json())
      .then(setUser)
      .catch(err => console.error(err));
  }, []);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('id', userId);
    if (photo) formData.append('profile_photo', photo);

    const res = await fetch(`${API_BASE_URL}/auth/update_photo.php`, {
      method: 'POST',
      body: formData
    });
    const result = await res.json();
    alert(result.message || 'Updated');
    window.location.reload();
  };

  if (!user) return <p>Loading...</p>;

  const fullName = 'Mark Ian F.';

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-photo">
         
<img 
  src={
    user.profile_photo && user.profile_photo !== ''
      ? `http://localhost/car-rental-api/api/uploads/${user.profile_photo}`
      : defaultAvatar
  }
  alt="Profile"
/>
          <input type="file" onChange={handlePhotoChange} />
        </div>
        <div className="profile-info">
          <h2>{fullName}</h2>
          <p>Joined {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
        </div>
      </div>

      <div className="profile-verification">
        <h3>Verified Info</h3>
        <ul>
          <li>✅ Email address</li>
          <li>
            📞 Phone number —{" "}
            {user.mobile ? 'Verified' : <button>Verify phone number</button>}
          </li>
          <li>
            🪪 Approved to drive —{" "}
            {user.status === 'verified' ? '✅' : <button>Verify ID</button>}
          </li>
        </ul>
        <p className="tip-text">Build trust with other users by verifying your contact information.</p>
        <button onClick={handleSave} disabled={!photo}>Save photo</button>
      </div>

      <div className="profile-reviews">
        <h3>Reviews from Hosts</h3>
        <p>No reviews yet</p>
      </div>
    </div>
  );
};

export default Profile;
